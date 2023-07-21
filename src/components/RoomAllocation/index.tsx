import { useEffect, useMemo, useState } from 'react';
import {
  CounterDescription,
  CounterTextContainer,
  CounterTitle,
  Remaining,
  RoomContainer,
  RoomCounter,
  RoomTitle,
  Wrapper,
} from './styles';
import CustomInputNumber from '@/components/CustomInputNumber';
import { validateMinMax } from '@/utils/validateMinMax';

interface IRoomAllocationResult {
  adult: number;
  child: number;
}

interface IRoomAllocationProps {
  guest: number;
  room: number;
  onChange: (result: IRoomAllocationResult[]) => void;
}

const roomTypes: Array<keyof IRoomAllocationResult> = ['adult', 'child'];

const RoomAllocation = ({ guest, room, onChange }: IRoomAllocationProps) => {
  const [bookingDetails, setBookingDetails] = useState<IRoomAllocationResult[]>(
    Array.from({ length: room }, () => {
      return { adult: 1, child: 0 };
    })
  );
  const remainingGuestCount = useMemo<number>(() => {
    const total = bookingDetails.reduce((acc, current) => {
      return acc + current.adult + current.child;
    }, 0);
    return guest - total;
  }, [bookingDetails]);

  const handleUpdateBookingDetails = ({
    value,
    roomIndex,
    roomType,
  }: {
    value: number;
    roomIndex: number;
    roomType: keyof IRoomAllocationResult;
  }) => {
    setBookingDetails((prevState) => {
      let [...result] = prevState;
      result[roomIndex][roomType] = value;
      return result;
    });
  };

  useEffect(() => {
    onChange(bookingDetails);
  }, [onChange, bookingDetails]);

  return (
    <Wrapper>
      <p>
        住客人數： {guest}人 / {room}房
      </p>
      <Remaining>尚未分配人數：{remainingGuestCount}人</Remaining>

      {bookingDetails.map((room, index) => {
        const remainingRoomGuestCount = 4 - room.adult - room.child;
        return (
          <RoomContainer key={index}>
            <RoomTitle>房間：{room.adult + room.child}人</RoomTitle>
            {roomTypes.map((roomType) => (
              <RoomCounter key={roomType}>
                <CounterTextContainer>
                  <CounterTitle>
                    {roomType === 'adult' ? '大人' : '小孩'}
                  </CounterTitle>
                  {roomType === 'adult' && (
                    <CounterDescription>年齡 20+</CounterDescription>
                  )}
                </CounterTextContainer>

                <CustomInputNumber
                  min={roomType === 'adult' ? 1 : 0}
                  max={4}
                  step={1}
                  name={`room_${index}_adult`}
                  value={room[roomType]}
                  disabled={false}
                  onChange={(event) => {
                    // console.log(
                    //   '@onChange',
                    //   event.target.name,
                    //   event.target.value
                    // );
                  }}
                  onBlur={(event) => {
                    // console.log(
                    //   '@onBlur',
                    //   event.target.name,
                    //   event.target.value
                    // );
                    const { value, max, min } = event.target;
                    const resultValue = validateMinMax(
                      +value,
                      +min,
                      Math.min(
                        remainingGuestCount + room[roomType],
                        remainingRoomGuestCount + room[roomType],
                        +max
                      )
                    );
                    event.target.value = resultValue.toString();
                    handleUpdateBookingDetails({
                      value: resultValue,
                      roomIndex: index,
                      roomType: roomType,
                    });
                  }}
                  handleUpdateBookingDetails={(resultValue) => {
                    handleUpdateBookingDetails({
                      value: resultValue,
                      roomIndex: index,
                      roomType: roomType,
                    });
                  }}
                  remainingGuestCount={remainingGuestCount}
                  remainingRoomGuestCount={remainingRoomGuestCount}
                />
              </RoomCounter>
            ))}
          </RoomContainer>
        );
      })}
    </Wrapper>
  );
};
export default RoomAllocation;

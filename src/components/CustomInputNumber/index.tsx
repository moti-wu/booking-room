import { ChangeEvent, useCallback, useMemo, useState } from 'react';
import useClickHold from '@/hooks/useClickHold';
import { validateMinMax } from '@/utils/validateMinMax';
import { ControlButton, InputGroupWrapper, StyledInput } from './styles';

interface ICustomInputNumberProps {
  min: number;
  max: number;
  step: number;
  name: string;
  value: number;
  disabled: boolean;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  onBlur: (event: ChangeEvent<HTMLInputElement>) => void;
  handleUpdateBookingDetails: (resultValue: number) => void;
  remainingGuestCount: number;
  remainingRoomGuestCount: number;
}

const CustomInputNumber = ({
  min,
  max,
  step,
  name,
  value,
  disabled,
  onChange,
  onBlur,
  handleUpdateBookingDetails,
  remainingGuestCount,
  remainingRoomGuestCount,
}: ICustomInputNumberProps) => {
  const [localValue, setLocalValue] = useState(value.toString());
  const isDisabledIncrease = useMemo(
    () =>
      disabled ||
      remainingGuestCount <= 0 ||
      +value >= max ||
      remainingRoomGuestCount <= 0,
    [disabled, remainingGuestCount, value, max, remainingRoomGuestCount]
  );
  const isDisabledDecrease = useMemo(
    () => disabled || +value <= min,
    [disabled, value, min]
  );

  const handleStep = useCallback(
    (type: 'increase' | 'decrease') => {
      if (type === 'increase' && isDisabledIncrease) return;
      if (type === 'decrease' && isDisabledDecrease) return;
      setLocalValue((prev) => {
        const resultValue = validateMinMax(
          type === 'increase' ? +prev + step : +prev - step,
          min,
          max
        );
        setTimeout(() => {
          handleUpdateBookingDetails(resultValue);
        }, 0);
        return resultValue.toString();
      });
    },
    [isDisabledIncrease, isDisabledDecrease, step, min, max]
  );

  const increaseClickHoldBinds = useClickHold({
    callback: () => handleStep('increase'),
    isInstant: true,
  });

  const decreaseClickHoldBinds = useClickHold({
    callback: () => handleStep('decrease'),
    isInstant: true,
  });

  const localOnChange = (event: ChangeEvent<HTMLInputElement>) => {
    setLocalValue(event.target.value);
    onChange(event);
  };

  const localOnBlur = (event: ChangeEvent<HTMLInputElement>) => {
    const resultValue = validateMinMax(
      +event.target.value,
      min,
      Math.min(
        remainingGuestCount + value,
        remainingRoomGuestCount + value,
        max
      )
    );
    setLocalValue(resultValue.toString());
    onBlur(event);
  };

  return (
    <InputGroupWrapper>
      <ControlButton {...decreaseClickHoldBinds} disabled={isDisabledDecrease}>
        -
      </ControlButton>
      <StyledInput
        min={min}
        max={max}
        step={step}
        name={name}
        value={localValue}
        disabled={disabled}
        onChange={localOnChange}
        onBlur={localOnBlur}
      />
      <ControlButton {...increaseClickHoldBinds} disabled={isDisabledIncrease}>
        +
      </ControlButton>
    </InputGroupWrapper>
  );
};

export default CustomInputNumber;

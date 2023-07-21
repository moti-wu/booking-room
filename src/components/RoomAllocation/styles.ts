import { PRIMARY } from '@/contants/color';
import { alpha, styled } from '@mui/system';

export const Wrapper = styled('div')({
  display: 'flex',
  flexDirection: 'column',
  gap: '20px',
  margin: '10px auto',
  padding: '20px',
  width: '500px',
  maxWidth: '100%',
  boxShadow: '0 0 6px rgba(0, 0, 0, 0.1)',
});

export const Remaining = styled('div')({
  padding: '20px',
  color: '#777',
  background: alpha(PRIMARY, 0.1),
  border: `1px solid ${alpha(PRIMARY, 0.5)}`,
  borderRadius: '6px',
});

export const RoomContainer = styled('div')({
  display: 'flex',
  flexDirection: 'column',
  gap: '10px',
  padding: '10px 0',
  '& + &': {
    paddingTop: '30px',
    borderTop: '1px solid #ddd',
  },
});

export const RoomTitle = styled('div')({
  fontSize: '20px',
  fontWeight: '700',
});

export const RoomCounter = styled('div')({
  display: 'flex',
  alignItems: 'flex-start',
  justifyContent: 'space-between',
});

export const CounterTextContainer = styled('div')({
  display: 'flex',
  flexDirection: 'column',
  gap: '8px',
  padding: '8px 0',
});

export const CounterTitle = styled('p')({
  fontSize: '16px',
});

export const CounterDescription = styled('p')({
  fontSize: '16px',
  color: '#999',
});

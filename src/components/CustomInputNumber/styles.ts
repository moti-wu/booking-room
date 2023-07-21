import { PRIMARY } from '@/contants/color';
import { alpha, styled } from '@mui/system';

export const InputGroupWrapper = styled('div')({
  display: 'flex',
  gap: '8px',
  padding: '8px',
});

export const ControlButton = styled('button')({
  width: '48px',
  height: '48px',
  fontSize: '24px',
  color: PRIMARY,
  background: 'transparent',
  border: `1px solid ${PRIMARY}`,
  borderRadius: '4px',
  transition: 'background-color 0.2s',
  '&:hover': {
    backgroundColor: '#f0fdff',
  },
  '&:active': {
    backgroundColor: '#c7f7ff',
  },
  '&:disabled': {
    backgroundColor: '#fff',
    opacity: '0.4',
    cursor: 'not-allowed',
  },
});

export const StyledInput = styled('input')({
  width: '48px',
  height: '48px',
  textAlign: 'center',
  fontSize: '16px',
  border: '1px solid #bfbfbf',
  borderRadius: '4px',
  '&:disabled': {
    backgroundColor: alpha('#eee', 0.2),
    cursor: 'not-allowed',
  },
});

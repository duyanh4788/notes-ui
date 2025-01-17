import Box from '@mui/material/Box';
import { TimerType } from 'commom/contants';
import { useEffect, useRef } from 'react';

interface Props {
  isEdit: boolean;
  scheduleTime: any;
  changeTime: (unit: TimerType, value: number) => void;
}

export default function FlipTimer(props: Props) {
  const { isEdit, scheduleTime, changeTime } = props;
  const hourRef = useRef<HTMLUListElement>(null);
  const minuteRef = useRef<HTMLUListElement>(null);
  const secondRef = useRef<HTMLUListElement>(null);

  useEffect(() => {
    const hourElement = hourRef.current;
    const minuteElement = minuteRef.current;
    const secondElement = secondRef.current;
    const onScrollHour = () => handleScroll(hourRef, TimerType.HOUR);
    const onScrollMinute = () => handleScroll(minuteRef, TimerType.MINUTE);
    const onScrollSecond = () => handleScroll(secondRef, TimerType.SECOND);

    hourElement?.addEventListener('scroll', onScrollHour);
    minuteElement?.addEventListener('scroll', onScrollMinute);
    secondElement?.addEventListener('scroll', onScrollSecond);

    return () => {
      hourElement?.removeEventListener('scroll', onScrollHour);
      minuteElement?.removeEventListener('scroll', onScrollMinute);
      secondElement?.removeEventListener('scroll', onScrollSecond);
    };
  }, [isEdit]);

  const handleScroll = (ref: React.RefObject<HTMLUListElement>, unit: TimerType) => {
    if (!isEdit) return;
    if (ref.current) {
      const ulElement = ref.current;
      const liElements = ulElement.getElementsByTagName('li');
      const ulScrollTop = ulElement.scrollTop;
      const ulHeight = ulElement.clientHeight;

      let closestLi: HTMLLIElement | null = null;
      let minDistance = Infinity;

      for (let i = 0; i < liElements.length; i++) {
        const liElement = liElements[i];
        const liOffsetTop = liElement.offsetTop;
        const liHeight = liElement.clientHeight;
        const liCenter = liOffsetTop + liHeight / 2;
        const ulCenter = ulScrollTop + ulHeight / 2;
        const distance = Math.abs(liCenter - ulCenter);

        if (distance < minDistance) {
          minDistance = distance;
          closestLi = liElement;
        }
      }
      if (closestLi) {
        const value = parseInt(closestLi.getAttribute('data-value') || '0', 10);
        changeTime(unit, value);
      }
    }
  };

  const generateItems = (max: number, selectedValue: number) => {
    if (!isEdit) {
      return <li>{selectedValue}</li>;
    }
    const items: React.ReactElement[] = [];
    for (let i = 0; i < max; i++) {
      const re = Number(i.toString().padStart(2, '0'));
      items.push(
        <li
          key={i}
          data-value={i}
          className={i === selectedValue ? 'active' : ''}
          defaultValue={selectedValue}
        >
          {re === selectedValue ? selectedValue : re}
        </li>,
      );
    }
    return items;
  };

  return (
    <Box className="flip_time">
      <Box className="time_unit">
        <ul ref={hourRef} className="time_list" defaultValue={scheduleTime.hour}>
          {generateItems(24, scheduleTime.hour)}
        </ul>
      </Box>
      <Box className="time_unit">
        <ul ref={minuteRef} className="time_list" defaultValue={scheduleTime.hour}>
          {generateItems(60, scheduleTime.minute)}
        </ul>
      </Box>
      <Box className="time_unit">
        <ul ref={secondRef} className="time_list" defaultValue={scheduleTime.hour}>
          {generateItems(60, scheduleTime.second)}
        </ul>
      </Box>
    </Box>
  );
}

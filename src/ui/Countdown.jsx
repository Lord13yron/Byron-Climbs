import {
  differenceInDays,
  differenceInHours,
  differenceInMinutes,
  differenceInSeconds,
} from "date-fns";
import { useEffect, useState } from "react";
import styled from "styled-components";

const Timer = styled.p`
  background-color: var(--color-nature-0);
  color: var(--color-nature-700);
  border-radius: var(--border-radius-sm);
  padding: 0.5rem;
  margin-bottom: 0.5rem;
`;

function Countdown() {
  const targetDate = new Date("2025-07-05T12:15:00");
  const caulculateTimeLeft = () => {
    const today = new Date();
    const days = differenceInDays(targetDate, today);
    const hours = (differenceInHours(targetDate, today) % 24)
      .toString()
      .padStart(2, "0");
    const minutes = (differenceInMinutes(targetDate, today) % 60)
      .toString()
      .padStart(2, "0");
    const seconds = (differenceInSeconds(targetDate, today) % 60)
      .toString()
      .padStart(2, "0");

    return { days, hours, minutes, seconds };
  };

  const [timeLeft, setTimeLeft] = useState(caulculateTimeLeft());

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(caulculateTimeLeft());
    }, 1000);
    return () => clearInterval(timer);
  });

  return (
    <Timer>
      {timeLeft.days} days {timeLeft.hours}:{timeLeft.minutes}:
      {timeLeft.seconds} until Spain
    </Timer>
  );
}

export default Countdown;

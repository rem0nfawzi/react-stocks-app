interface CurrentMessageProps {
  currentMessage: string;
}
const CurrentMessage = ({ currentMessage }: CurrentMessageProps) => {
  return (
    <p data-testid="current-msg" className="text-white italic font-medium">
      {currentMessage}
    </p>
  );
};

export default CurrentMessage;

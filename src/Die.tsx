type DieProps = {
  isHeld: boolean;
  value: number;
  holdDice: (id: string) => any;
};

function Die({ isHeld, holdDice, value }: DieProps) {
  const styles = {
    backgroundColor: isHeld ? "#59E391" : "white",
  };
  return (
    <div onClick={holdDice} className="die-face" style={styles}>
      <h2 className="die-num">{value}</h2>
    </div>
  );
}

export default Die;

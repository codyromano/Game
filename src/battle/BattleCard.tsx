const uppercaseFirstLetter = (text: string) =>
  text.charAt(0).toUpperCase() + text.slice(1);

export default function BattleCard({
  characterName,
  health,
}: {
  health: number;
  characterName: string;
}) {
  return (
    <div className="battle-card">
      <label>{uppercaseFirstLetter(characterName)}</label>
      <progress className="battle-card-progress" max={100} value={health} />
    </div>
  );
}

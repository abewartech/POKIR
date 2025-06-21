import Card from "../Card";
import DataSummary from "./DataSummary";
import TitleMenu from "./TitleMenu";

export default function Menu(props) {
  const { bgColor, icon, title, subtitle, textColor, value, ...rest } = props;
  return (
    <Card className="py-8 cursor-pointer" {...rest}>
      <TitleMenu bgColor={bgColor} icon={icon} title={title} />
      <DataSummary
        subtitle={subtitle}
        bgColor={bgColor}
        textColor={textColor}
        value={value}
      />
    </Card>
  );
}

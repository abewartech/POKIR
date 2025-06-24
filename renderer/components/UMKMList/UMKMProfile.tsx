import ItemContent from "../ItemContent";

export default function UMKMProfile(props) {
  const { action, title, subtitle } = props;
  return (
    <ItemContent action={action} title={title} subtitle={subtitle} />
  );
}

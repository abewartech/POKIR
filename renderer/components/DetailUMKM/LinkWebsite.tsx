import Card from "../Card";
import LinkItem from "./LinkItem";
import LinkPagination from "./LinkPagination";

export default function LinkWebsite() {
  return (
    <Card title="Link Website">
      {[...Array(5)].map((_, i) => (
        <LinkItem
          key={i}
          link="https://webbsfosicoicmsdccsdc/codcisd"
          idx={i}
        />
      ))}
      <LinkPagination />
    </Card>
  );
}

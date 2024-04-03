import { Button } from "@/components/ui/button";

type Props = {
  title: string;
  id: string;
  onClick: (id: string) => void;
};

export const Option = ({
  title,
  id,
  onClick,
}: Props) => {
  return (
    <Button
    variant="secondaryOutline"
      onClick={() => onClick(id)}
    >
     
      <p className="text-neutral-700 text-center font-bold mt-3">
        {title}
      </p>
    </Button>
  );
};
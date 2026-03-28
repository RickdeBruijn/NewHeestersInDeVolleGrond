import { Flex, ActionIcon, TextInput } from "@mantine/core";
import { IconMinus, IconPlus } from "@tabler/icons-react";

type Props = {
  value: number;
  onChange: (value: number) => void;
  min?: number;
};

export default function QuantityInput({
  value,
  onChange,
  min = 0,
}: Props) {
  const handleDecrease = () => {
    const newValue = Math.max(min, (value || 0) - 1);
    onChange(newValue);
  };

  const handleIncrease = () => {
    const newValue = (value || 0) + 1;
    onChange(newValue);
  };

  return (
    <Flex style={{ width: "100%", justifyContent: "center" }}>
      {/* Decrease Button */}
      <ActionIcon
        variant="filled"
        onClick={handleDecrease}
        disabled={value <= min}
        radius={0}
        style={{
          borderTopRightRadius: 0,
          borderBottomRightRadius: 0,
          borderRight: "1px solid #ccc",
        }}
        size={36}
      >
        <IconMinus size={18} />
      </ActionIcon>

      {/* Number Input */}
      <TextInput
        value={value}
        onChange={(e) => {
          const val = e.target.value.replace(/\D/g, "");
          onChange(val === "" ? 0 : Number(val));
        }}
        inputMode="numeric"
        styles={{
          input: {
            textAlign: "center",
            width: 80, // double previous width
            borderRadius: 0,
            borderLeft: 0,
            borderRight: 0,
          },
        }}
      />

      {/* Increase Button */}
      <ActionIcon
        variant="filled"
        onClick={handleIncrease}
        radius={0}
        style={{
          borderTopLeftRadius: 0,
          borderBottomLeftRadius: 0,
          borderLeft: "1px solid #ccc",
        }}
        size={36}
      >
        <IconPlus size={18} />
      </ActionIcon>
    </Flex>
  );
}
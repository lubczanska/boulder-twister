interface ButtonProps {
  label: string;
  onClick?: (e?: React.FormEvent) => void;
  type?: "button" | "submit" | "reset" | undefined;
}

const Button = ({ label, onClick, type }: ButtonProps) => {
  return (
    <button
      type={type}
      className="border border-black text-black bg-white font-bold text-lg m-1 py-2 px-10 w-2/3 rounded-full hover:bg-black hover:text-white"
      onClick={onClick}
    >
      {label}
    </button>
  );
};

export default Button;

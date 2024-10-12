import './header.scss';

interface HeaderProps {
  className?: string;
  text: string;
  size?: '1x' | '2x' | '3x';
}

export const Header = ({ className, text, size = '1x' }: HeaderProps) => {
  return <h1 className={`header size-${size} ${className ?? ''}`}>{text}</h1>;
};

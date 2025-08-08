import Image from 'next/image';

export const Header = () => {
  return (
    <nav className="bg-custom-neutral-800 h-[54px]  md:h-[74px] py-[13px] px-4 md:py-[23px] md:px-8">
      <Image
        src="./assets/images/logo-dark.svg"
        alt="logo"
        width={95}
        height={28}
        className=""
      />
    </nav>
  );
};

export default function BurgerMenu({ opened, mobile, onClick }) {
	return (
		<div className={`${!mobile && 'absolute'} cursor-pointer w-[50px]`}
		     onClick={onClick}>
			<img alt="logo" className="w-full h-auto"
			     src={opened ? '/assets/images/close.svg' : '/assets/images/burger_menu.svg'} />
		</div>
	);
}
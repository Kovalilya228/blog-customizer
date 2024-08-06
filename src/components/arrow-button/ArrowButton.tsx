import arrow from 'src/images/arrow.svg';

import styles from './ArrowButton.module.scss';
import clsx from 'clsx';

/** Функция для обработки открытия/закрытия формы */
export type OnClick = () => void;

type ButtonProps = {
	onClickHandler: OnClick;
	opened: boolean;
};

export const ArrowButton = (props: ButtonProps) => {
	const { onClickHandler, opened } = props;

	return (
		/* Не забываем указаывать role и aria-label атрибуты для интерактивных элементов */
		<div
			role='button'
			aria-label='Открыть/Закрыть форму параметров статьи'
			tabIndex={0}
			className={clsx(styles.container, opened && styles.container_open)}
			onClick={() => onClickHandler()}>
			<img
				src={arrow}
				alt='иконка стрелочки'
				className={clsx(styles.arrow, opened && styles.arrow_open)}
			/>
		</div>
	);
};

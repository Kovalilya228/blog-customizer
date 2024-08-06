import { ArrowButton } from 'components/arrow-button/ArrowButton';
import { Button } from 'components/button';
import { Text } from 'components/text/Text';
import { RadioGroup } from '../radio-group';
import { Select } from '../select';
import { Separator } from '../separator';
import {
	fontFamilyOptions,
	fontColors,
	backgroundColors,
	contentWidthArr,
	fontSizeOptions,
	ArticleStateType,
	OptionType,
	defaultArticleState,
} from '../../constants/articleProps';

import styles from './ArticleParamsForm.module.scss';
import clsx from 'clsx';
import { useState, FormEvent, useRef } from 'react';
import { useOutsideClickClose } from './hooks/useOutsideClickClose';

type ArticleParamsFormProps = {
	setArticleState: (value: ArticleStateType) => void;
};

export const ArticleParamsForm = (props: ArticleParamsFormProps) => {
	const { setArticleState } = props;
	const [isOpened, setIsOpened] = useState(false);
	const [formState, setFormState] = useState(defaultArticleState);
	const rootRef = useRef(null);

	useOutsideClickClose({
		isOpened,
		rootRef,
		onChange: setIsOpened,
	});

	const changeFormState = (name: string) => {
		return (value: OptionType) => {
			setFormState((currentState) => ({
				...currentState,
				[name]: value,
			}));
		};
	};

	const submitHandler = (e: FormEvent) => {
		e.preventDefault();
		setArticleState(formState);
	};

	const resetHandler = (e: FormEvent) => {
		e.preventDefault();
		setFormState(defaultArticleState);
		setArticleState(defaultArticleState);
	};

	return (
		<>
			<ArrowButton
				onClickHandler={() => setIsOpened((current) => !current)}
				opened={isOpened}
			/>
			<aside
				ref={rootRef}
				className={clsx(styles.container, isOpened && styles.container_open)}>
				<form
					className={styles.form}
					onSubmit={submitHandler}
					onReset={resetHandler}>
					<Text as={'h2'} size={31} weight={800} uppercase>
						{'Задайте параметры'}
					</Text>
					<Select
						selected={formState.fontFamilyOption}
						options={fontFamilyOptions}
						title='шрифт'
						onChange={changeFormState('fontFamilyOption')}></Select>
					<RadioGroup
						name='fontSize'
						options={fontSizeOptions}
						selected={formState.fontSizeOption}
						title='размер шрифта'
						onChange={changeFormState('fontSizeOption')}></RadioGroup>
					<Select
						selected={formState.fontColor}
						options={fontColors}
						title='цвет шрифта'
						onChange={changeFormState('fontColor')}></Select>
					<Separator></Separator>
					<Select
						selected={formState.backgroundColor}
						options={backgroundColors}
						title='цвет фона'
						onChange={changeFormState('backgroundColor')}></Select>
					<Select
						selected={formState.contentWidth}
						options={contentWidthArr}
						title='ширина контента'
						onChange={changeFormState('contentWidth')}></Select>
					<div className={styles.bottomContainer}>
						<Button title='Сбросить' type='reset' />
						<Button title='Применить' type='submit' />
					</div>
				</form>
			</aside>
		</>
	);
};

import * as React from 'react';
import Button from '@material-ui/core/Button';
import { Dialog, DialogTitle, DialogContent, DialogActions } from '~components/dialogs';
import { DropdownOption } from '~components/dropdown/Dropdown';
import { getSortedGroupedDataTypes, getDataType } from '~utils/dataTypeUtils';
import styles from './HelpDialog.scss';
import { DataTypeFolder } from '../../../_plugins';

export type HelpDialogProps = {
	initialDataType: DataTypeFolder | null;
	visible: boolean;
	onClose: any;
	coreI18n: any;
	dataTypeI18n: any;
	onSelectDataType: (dataType: DataTypeFolder) => void;
};

const DataTypeList = ({ onSelect, filterString }: any): any => {
	const dataTypes = getSortedGroupedDataTypes();
	const regex = new RegExp(filterString, 'i');

	const content: any = [];
	dataTypes.forEach(({ label, options }: { label: string; options: any }) => {
		let list: any = options;
		if (filterString.trim() !== '') {
			list = list.filter(({ value, label }: DropdownOption) => regex.test(value) || regex.test(label));
		}
		list = list.map(({ value, label }: DropdownOption) => (
			<li key={value} onClick={(): void => onSelect(value)}>{label}</li>
		));

		if (list.length) {
			content.push(
				<div key={label}>
					<h3>{label}</h3>
					<ul>{list}</ul>
				</div>
			);
		}
	});

	return content;
};

const HelpDialog = ({ initialDataType, visible, onClose, coreI18n, dataTypeI18n, onSelectDataType }: HelpDialogProps): JSX.Element => {
	const [dataType, setDataType] = React.useState<DataTypeFolder | null>(null);
	const [filterString, setFilterString] = React.useState('');

	const selectDataType = (dataType: DataTypeFolder): void => {
		onSelectDataType(dataType);
		setDataType(dataType);
	};

	React.useEffect(() => {
		setDataType(initialDataType);
	}, [initialDataType]);

	const { name, Help } = getDataType(dataType);
	const i18n = dataType ? dataTypeI18n[dataType] : {};

	return (
		<Dialog onClose={onClose} aria-labelledby="customized-dialog-title" open={visible}>
			<DialogTitle onClose={onClose}>{name}</DialogTitle>
			<DialogContent dividers className={styles.contentPanel}>
				<div className={styles.dataTypeList}>
					<input
						type="text"
						placeholder="Filter Data Types"
						autoFocus
						onChange={(e): void => setFilterString(e.target.value)}
					/>
					<div className={styles.list}>
						<DataTypeList
							filterString={filterString}
							onSelect={selectDataType}
						/>
					</div>
				</div>
				<div className={styles.helpContent}>
					<Help
						coreI18n={coreI18n}
						i18n={i18n}
					/>
				</div>
			</DialogContent>
			<DialogActions>
				<Button onClick={onClose} color="primary" variant="outlined">
					{coreI18n.close}
				</Button>
			</DialogActions>
		</Dialog>
	);
};

export default HelpDialog;

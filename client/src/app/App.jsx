import React from 'react';
import { connect } from 'react-redux';
import Select from 'react-select';
import { PropTypes } from 'prop-types';

import 'react-select/dist/react-select.css';
import './App.scss';

import * as actions from './AppActions';
import rules from '../../data/rules';
import characteristics from '../../data/characteristics';

import Sidebar from './Sidebar';
import KnowledgeBase from './KnowledgeBase';

let selectPromise;

class App extends React.Component {
	constructor() {
		super();
		this.state = {
			route: 'Algorithm',
			logs: [],
			result: '',
			question: ''
		};
	}
	onSelectChange = selected => {
		selectPromise(selected.value);
	};
	setQuestion = characteristic => {
		if (!characteristic) {
			this.setState({ question: '' });
		}
		this.setState({ question: `What is the snake's ${characteristic}?` });
	};
	setResult = snake => {
		if (!snake) {
			this.setState({ result: "Sorry, can't identify your snake!" });
			return;
		}
		this.setState({ result: `You were bitten by a ${snake}!` });
	};
	menuItemChanged = menuItem => {
		if (menuItem !== this.state.route) {
			this.setState({ route: menuItem });
		}
	};
	restartAlgorithm = () => {
		if (selectPromise) {
			selectPromise('cancel await');
		}
		this.setState({ result: '', question: '', logs: [] }, () => {
			algorithm(
				this.props.setSelectValues,
				this.setQuestion,
				this.setResult,
				this.updateLog
			);
		});
	};
	updateLog = records => {
		this.setState({ logs: records });
	};
	renderAlgorithmPage = () => {
		const { selectValues } = this.props;
		const startBtn =
			this.state.question && !this.state.result
				? ''
				: <button className="btn" onClick={this.restartAlgorithm}>
						Start algo
					</button>;
		const select =
			this.state.question && !this.state.result
				? <Select
						name="answer"
						options={selectValues}
						onChange={this.onSelectChange}
					/>
				: '';
		const logs = this.state.logs.map(record =>
			<p key={record.id}>
				{record.message}
			</p>
		);

		return (
			<div id="algorithm-content" className="algorithm-content">
				<div>
					{startBtn}
				</div>
				<div>
					{this.state.result ? '' : this.state.question}
				</div>
				<div className="select-container">
					{select}
				</div>
				<div>
					{this.state.result}
				</div>
				<div className="logs-container">
					{logs}
				</div>
			</div>
		);
	};
	render() {
		const content =
			this.state.route === 'Algorithm'
				? this.renderAlgorithmPage()
				: <KnowledgeBase />;
		return (
			<div className="app">
				<Sidebar onMenuHover={this.menuItemChanged} />
				<div className="content">
					{content}
				</div>
			</div>
		);
	}
}

const needsChecking = characteristics.reduce((prev, curr) => {
	const result = { ...prev };
	if (curr.needsChecking) {
		result[curr.name] = curr.needsChecking;
	}
	return result;
}, {});

/* facts we know */
let knowledge = {};

const noQuestions = ['snake', 'type'];

const target = 'snake';
let targetStack = [target];
let result;

async function algorithm(setSelectValues, setQuestion, setResult, updateLog) {
	const logs = [];
	let rulesCopy = [...rules];
	knowledge = {};
	targetStack = [target];
	result = false;
	while (!result) {
		const currentTarget = targetStack[targetStack.length - 1];
		addRecordToLogs(logs, `Trying to find out ${currentTarget}.`);
		const currentRule = rulesCopy.find(
			rule => !rule.skip && rule.then.characteristic === currentTarget
		);
		if (currentRule) {
			addRecordToLogs(logs, `Analyzing rule #${currentRule.id}.`);
			const checkResult = checkRule(currentRule.if);
			switch (checkResult) {
				case true:
					knowledge[targetStack.pop()] = currentRule.then.value;
					addRecordToLogs(
						logs,
						`Found out that ${currentTarget} is ${currentRule.then
							.value}.`
					);
					if (targetStack.length === 0) {
						addRecordToLogs(logs, 'Found the answer!');
						result = true;
					} else {
						addRecordToLogs(logs, 'Going to the next rule.');
						rulesCopy = rulesCopy.filter(
							rule => rule !== currentRule
						);
						resetSkip();
					}
					break;

				case false:
					addRecordToLogs(
						logs,
						'Rule contradicts collected knowledge, skipping to the next rule.'
					);
					rulesCopy = rulesCopy.filter(rule => rule !== currentRule);
					break;

				default:
					addRecordToLogs(
						logs,
						`Next will try to find out ${checkResult.characteristic}.`
					);
					if (checkResult.characteristic === currentTarget) {
						currentRule.skip = true;
					}

					if (needsChecking[checkResult.characteristic]) {
						addRecordToLogs(
							logs,
							`${checkResult.characteristic} is a complex characteristic, will check it ${needsChecking[
								checkResult.characteristic
							]} times.`
						);
						for (
							let i = 0;
							i < needsChecking[checkResult.characteristic];
							i++
						) {
							targetStack.push(checkResult.characteristic);
						}
					} else {
						targetStack.push(checkResult.characteristic);
					}
					break;
			}
		} else {
			const question = targetStack.pop();
			if (noQuestions.indexOf(question) === -1) {
				addRecordToLogs(
					logs,
					`Waiting for the user to specify ${question}.`
				);
				const options = characteristics.find(
					char => char.name === question
				).values;
				setQuestion(question);
				setSelectValues(options);
				await new Promise(resolve => {
					selectPromise = resolve;
				}).then(answer => {
					addRecordToLogs(
						logs,
						`User answered that the ${question} is ${answer}.`
					);
					knowledge[question] = answer;
				});
			} else if (question !== target) {
				addRecordToLogs(logs, `Found nothing new about ${question}`);
				knowledge[question] = knowledge[question] || false;
				resetSkip();
			} else {
				result = true;
			}
		}
	}
	if (knowledge[target]) {
		setResult(knowledge[target]);
	} else {
		setResult();
	}
	addRecordToLogs(logs, 'Algorithm finished.');
	updateLog(logs);
}

function checkRule(conditions) {
	for (let i = 0; i < conditions.length; i++) {
		const characteristic = conditions[i].characteristic;
		if (Object.keys(knowledge).indexOf(characteristic) !== -1) {
			if (conditions[i].value !== knowledge[characteristic]) {
				return false;
			}
		} else {
			return conditions[i];
		}
	}

	return true;
}

function resetSkip() {
	for (let i = 0, len = rules.length; i < len; i++) {
		rules[i].skip = false;
	}
}

function addRecordToLogs(logs, message) {
	logs.push({
		id: logs.length,
		message
	});
}

App.propTypes = {
	selectValues: PropTypes.arrayOf(
		PropTypes.shape({
			label: PropTypes.string,
			value: PropTypes.string
		})
	).isRequired,
	setSelectValues: PropTypes.func.isRequired
};

function mapStateToProps(state) {
	return {
		selectValues: state.app.selectValues
	};
}

export default connect(mapStateToProps, actions)(App);

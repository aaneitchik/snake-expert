import React from 'react';
import reactStamp from 'react-stamp';
import {connect} from 'react-redux';
import Select from 'react-select';

import * as actions from './AppActions';
import * as rulesData from '../../data/rules';
import * as characteristicsData from '../../data/characteristics';

import 'react-select/dist/react-select.css';
import './App.scss';

import {Sidebar} from './Sidebar';
import {KnowledgeBase} from './KnowledgeBase';

let rules = rulesData.rules.map((rule, number) => {return {...rule, number};});
let characteristics = [...characteristicsData.characteristics];

const App = reactStamp(React).compose({
	state: {
		route: 'Algorithm',
		logs: [],
		result: '',
		question: ''
	},
	menuItemChanged(menuItem){
		if (menuItem !== this.state.route) {
			this.setState({route: menuItem});
		}
	},
	setQuestion(characteristic) {
		if (!characteristic) {
			this.setState({question: ''})
		}
		this.setState({question: `What is the snake's ${characteristic}?`})
	},
	setResult(snake) {
		if (!snake) {
			this.setState({result: 'Sorry, can\'t identify your snake!'});
			return;
		}
		this.setState({result: `You were bitten by a ${snake}!`});
	},
	updateLog(records) {
		this.setState({logs: records});
	},
	onSelectChange(selected) {
		selectPromise(selected.value);
	},
	restartAlgorithm() {
		if (selectPromise) {
			selectPromise('cancel await');
		}
		this.setState({result: '', question: '', logs: []}, () => {
			algorithm(this.props.setSelectValues.bind(this),
				this.setQuestion.bind(this),
				this.setResult.bind(this),
				this.updateLog.bind(this));
		});
	},
	render() {
		const height = window.innerHeight + 'px';
		const content = this.state.route === 'Algorithm' ? this.renderAlgorithmPage.bind(this)() : <KnowledgeBase />;
		return (
			<div className="app">
				<Sidebar onMenuHover={this.menuItemChanged.bind(this)}/>
				<div className="content" style={{height}}>
					{content}
				</div>
			</div>
		);
	},
	renderAlgorithmPage() {
		const {selectValues} = this.props;
		const startBtn = this.state.question && !this.state.result ? '' :
			<button className="btn" onClick={() => this.restartAlgorithm()}>Start algo</button>;
		const select = this.state.question && !this.state.result ? <Select name="answer"
																		   options={selectValues}
																		   onChange={this.onSelectChange.bind(this)}/> : '';
		const logs = this.state.logs.map((record, index) => {
			return (
				<p key={index}>{record}</p>
			);
		});

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
	}
});

const needsChecking = characteristics.reduce((prev, curr) => {
	if (curr.needsChecking) {
		prev[curr.name] = curr.needsChecking;
	}
	return prev;
}, {});

/* facts we know */
let knowledge = {};

const noQuestions = ['snake', 'type'];

const target = 'snake';
let targetStack = [target];
let result, selectPromise;

async function algorithm(setSelectValues, setQuestion, setResult, updateLog) {
	let logs = [];
	let _rules = [...rules];
	knowledge = {};
	targetStack = [target];
	result = false;
	while (!result) {
		const currentTarget = targetStack[targetStack.length - 1];
		logs.push(`Trying to find out ${currentTarget}.`);
		const rule = _rules.find((rule) => !rule.skip && (rule.then.characteristic === currentTarget));
		if (rule) {
			logs.push(`Analyzing rule #${rule.number + 1}.`);
			const checkResult = checkRule(rule.if);
			switch (checkResult) {
				case true:
					knowledge[targetStack.pop()] = rule.then.value;
					logs.push(`Found out that ${currentTarget} is ${rule.then.value}.`);
					if (targetStack.length === 0) {
						logs.push('Found the answer!');
						result = true;
					} else {
						logs.push('Going to the next rule.');
						_rules = _rules.filter((_rule) => _rule !== rule);
						resetSkip();
					}
					break;

				case false:
					logs.push('Rule contradicts collected knowledge, skipping to the next rule.');
					_rules = _rules.filter((_rule) => _rule !== rule);
					break;

				default:
					logs.push(`Next will try to find out ${checkResult.characteristic}.`);
					if (checkResult.characteristic === currentTarget) {
						rule.skip = true;
					}

					if (needsChecking[checkResult.characteristic]) {
						logs.push(`${checkResult.characteristic} is a complex characteristic, will check it ${needsChecking[checkResult.characteristic]} times.`)
						for (let i = 0; i < needsChecking[checkResult.characteristic]; i++) {
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
				logs.push(`Waiting for the user to specify ${question}.`);
				const options = characteristics.find((char) => char.name === question).values;
				setQuestion(question);
				setSelectValues(options);
				await new Promise(resolve => {
					selectPromise = resolve;
				}).then((answer) => {
					logs.push(`User answered that the ${question} is ${answer}.`);
					knowledge[question] = answer;
				});
			} else {
				if (question !== target) {
					logs.push(`Found nothing new about ${question}`);
					knowledge[question] = knowledge[question] || false;
					resetSkip();
				} else {
					result = true;
				}
			}
		}
	}
	if (knowledge[target]) {
		setResult(knowledge[target]);
	} else {
		setResult();
	}
	logs.push(`Algorithm finished.`);
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
	rules.forEach((rule) => {
		rule.skip = false;
	});
}

function mapStateToProps(state) {
	return {
		selectValues: state.app.selectValues
	};
}

export default connect(mapStateToProps, actions)(App);
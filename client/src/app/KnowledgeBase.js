import React from 'react';

import * as rulesData from '../../data/rules';

import './KnowledgeBase.scss';

let rules = [...rulesData.rules];

const KnowledgeBase = () => {
	return (
		<div id="knowledge-base" className="knowledge-base">
			{renderRules()}
		</div>
	);
};

function renderRules() {
	return rules.map((rule, index) => {
		const conditions = rule.if.map((condition, index) => {
			return <span key={index}>{index ? ' AND ' : ''}{condition.characteristic} IS <span className="important">{condition.value}</span></span>;
		});
		const result = <span>{rule.then.characteristic} IS <span className="important"><i>{rule.then.value}</i></span>.</span>;
		return (
			<div key={index} className="rule">
				<p>{index + 1}</p>
				IF {conditions} THEN {result}
			</div>
		);
	});
}

export {KnowledgeBase};
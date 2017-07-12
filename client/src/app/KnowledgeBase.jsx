import React from 'react';

import rules from '../../data/rules';

import './KnowledgeBase.scss';

const KnowledgeBase = () =>
	<div id="knowledge-base" className="knowledge-base">
		{renderRules()}
	</div>;

function renderRules() {
	return rules.map(rule => {
		const conditions = rule.if.map((condition, index) =>
			<span
				key={`${rule.id}-${condition.characteristics}-${condition.value}`}
			>
				{index ? ' AND ' : ''}
				{condition.characteristic} IS{' '}
				<span className="important">{condition.value}</span>
			</span>
		);
		const result = (
			<span>
				{rule.then.characteristic} IS{' '}
				<span className="important">
					<i>
						{rule.then.value}
					</i>
				</span>.
			</span>
		);
		return (
			<div key={rule.id} className="rule">
				<p>{rule.id}</p>
				IF {conditions} THEN {result}
			</div>
		);
	});
}

export default KnowledgeBase;

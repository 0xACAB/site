'use client';
import { useState } from 'react';
import { Layout } from 'antd';
import { Col, InputNumber, Row, Slider } from 'antd';

const { Header, Footer, Sider, Content } = Layout;

const headerStyle = {
	textAlign: 'center',
	color: '#fff',
	height: 64,
	paddingInline: 48,
	lineHeight: '64px',
	backgroundColor: '#4096ff',
};
const contentStyle = {
	textAlign: 'center',
	minHeight: 120,
	color: '#000',
	backgroundColor: '#fff',
};
const siderStyle = {
	textAlign: 'center',
	lineHeight: '120px',
	color: '#fff',
	backgroundColor: '#1677ff',
};
const footerStyle = {
	textAlign: 'center',
	color: '#fff',
	backgroundColor: '#4096ff',
};
const layoutStyle = {
	overflow: 'hidden',
	width: 'calc(100%)',
	maxWidth: 'calc(100%)',
	height: '100vh',
};

const IntegerStep = () => {
	const [inputValue, setInputValue] = useState(1);
	const onChange = newValue => {
		setInputValue(newValue);
	};
	return (
		<Row justify="center">
			<Col span={12}>
				<Slider
					min={1}
					max={20}
					onChange={onChange}
					value={typeof inputValue === 'number' ? inputValue : 0}
				/>
			</Col>
			<Col span={4}>
				<InputNumber
					min={1}
					max={20}
					style={{ margin: '0 16px' }}
					value={inputValue}
					onChange={onChange}
				/>
			</Col>
		</Row>
	);
};

export default function Main({ mobile }) {
	return (
		<Layout style={layoutStyle}>
			<Sider width="25%" style={siderStyle}>
				Sider
			</Sider>
			<Layout>
				<Header style={headerStyle}>Header</Header>
				<Content style={contentStyle}>
					Slider
					<IntegerStep />
				</Content>
				<Footer style={footerStyle}>Footer</Footer>
			</Layout>
		</Layout>
	);
}
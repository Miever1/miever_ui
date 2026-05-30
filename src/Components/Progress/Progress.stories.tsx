import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import Progress from './Progress';

const meta: Meta<typeof Progress> = {
    title: 'Feedback/Progress',
    component: Progress,
    tags: ['autodocs'],
    parameters: {
        docs: {
            description: {
                component:
                    'Progress shows the completion of a task as a bar or circle — useful for skill levels, upload progress or a page-read indicator.',
            },
        },
    },
    argTypes: {
        percent: { control: { type: 'range', min: 0, max: 100, step: 1 }, description: 'Completion percentage (0–100).' },
        type: {
            control: 'inline-radio',
            options: ['line', 'circle'],
            description: 'Visual variant.',
            table: { defaultValue: { summary: 'line' } },
        },
        status: {
            control: 'select',
            options: ['normal', 'success', 'warning', 'danger'],
            description: 'Status color.',
            table: { defaultValue: { summary: 'normal' } },
        },
        showInfo: { control: 'boolean', description: 'Show the percentage label.' },
    },
    args: { percent: 60, type: 'line', status: 'normal', showInfo: true },
    decorators: [(Story) => <div style={{ maxWidth: 360 }}>{Story()}</div>],
};

export default meta;
type Story = StoryObj<typeof Progress>;

/** The default playground. Use the controls panel to explore every prop. */
export const Playground: Story = {};

/** Status colors. */
export const Statuses: Story = {
    render: () => (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            <Progress percent={40} status="normal" />
            <Progress percent={100} status="success" />
            <Progress percent={70} status="warning" />
            <Progress percent={30} status="danger" />
        </div>
    ),
};

/** Circle variant. */
export const Circle: Story = {
    render: () => (
        <div style={{ display: 'flex', gap: 24, alignItems: 'center' }}>
            <Progress type="circle" percent={25} />
            <Progress type="circle" percent={75} status="warning" />
            <Progress type="circle" percent={100} status="success" />
        </div>
    ),
};

/** Skill bars — a common personal-site use case. */
export const SkillBars: Story = {
    render: () => (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {[
                { label: 'TypeScript', percent: 90 },
                { label: 'React', percent: 85 },
                { label: 'CSS / SCSS', percent: 80 },
                { label: 'Node.js', percent: 70 },
            ].map((skill) => (
                <div key={skill.label}>
                    <div style={{ marginBottom: 4, fontSize: 14 }}>{skill.label}</div>
                    <Progress percent={skill.percent} />
                </div>
            ))}
        </div>
    ),
};

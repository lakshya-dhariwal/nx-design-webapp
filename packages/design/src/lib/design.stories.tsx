import type { Meta, StoryObj } from '@storybook/react';
import { Design } from './design';

const meta: Meta<typeof Design> = {
  component: Design,
  title: 'Design',
};
export default meta;
type Story = StoryObj<typeof Design>;

export const Primary = {
  args: {},
};

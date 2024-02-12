import {IntakeForm} from "../src/components/intake-form";
import {Meta, StoryObj} from "@storybook/react";

const meta: Meta<typeof IntakeForm> = {
    component: IntakeForm
};

export default meta
type Story = StoryObj<typeof IntakeForm>;

/*
 *👇 Render functions are a framework specific feature to allow you control on how the component renders.
 * See https://storybook.js.org/docs/api/csf
 * to learn how to use render functions.
 */
export const Primary: Story = {
  render: () => <IntakeForm />,
};

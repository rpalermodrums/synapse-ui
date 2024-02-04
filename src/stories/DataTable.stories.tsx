import { Meta } from '@storybook/react';
import { fakerEN_US as faker } from '@faker-js/faker';

import { DataTable } from '@/stories/data-table/DataTable';
import { columns } from './data-table/columns';

export default {
  title: 'UI/DataTable',
  component: DataTable,
} as Meta;

const data = Array.from({ length: 100 }, () => ({
  id: faker.string.uuid(),
  status: faker.helpers.arrayElement([
    'pending',
    'processing',
    'success',
    'failed',
  ]) as string,
  email: faker.internet.email(),
  amount: Number(faker.finance.amount({ min: 1, max: 1000 })),
}));

const Template = () => (
  <div className="rounded-md border">
    <DataTable columns={columns} data={data} />
  </div>
);

export const Default = Template.bind({});

import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import MyForm from './form';

const viewByOptions = [
  { label: 'View By Assigned', value: 'View By Assigned' },
  { label: 'View By Committee', value: 'View By Committee' },
];

const selectOptions = ['Option 1', 'Option 2', 'Option 3'];

describe('MyForm', () => {
    test('should render the form with select box and button', () => {
    const { getByTestId } = render(
      <MyForm
        valueForSelect="View By Assigned"
        options={selectOptions}
        viewBy={viewByOptions}
      />,
    );

    expect(getByTestId('value-for-select')).toBeInTheDocument();
    // expect(getByTestId('select-options')).not.toBeVisible();
    expect(getByTestId('submit')).toBeInTheDocument();
  });

  it('should show select box when View By Committee is selected', () => {
    render(
      <MyForm
        valueForSelect="View By Committee"
        options={selectOptions}
        viewBy={viewByOptions}
      />,
    );

    expect(screen.getByTestId('value-for-select')).toBeInTheDocument();
    expect(screen.getByTestId('select-options')).toBeVisible();
    expect(screen.getByTestId('submit')).toBeInTheDocument();
  });

//   it('should select all options when "Select All" is clicked', () => {
//     render(
//       <MyForm
//         valueForSelect="committee"
//         options={selectOptions}
//         viewBy={viewByOptions}
//       />,
//     );

//     const selectAllOption = screen.getByText('Select All');
//     fireEvent.click(selectAllOption);

//     expect(screen.getAllByRole('checkbox', { checked: true })).toHaveLength(
//       selectOptions.length + 1, // add 1 for the "Select All" checkbox
//     );
//   });

//   it('should select individual options when clicked', () => {
//     render(
//       <MyForm
//         valueForSelect="committee"
//         options={selectOptions}
//         viewBy={viewByOptions}
//       />,
//     );

//     const option1 = screen.getByText('Option 1');
//     const option2 = screen.getByText('Option 2');
//     fireEvent.click(option1);
//     fireEvent.click(option2);

//     expect(screen.getAllByRole('checkbox', { checked: true })).toHaveLength(2);
//   });

//   it('should show validation error when value select box is empty', async () => {
//     render(
//       <MyForm
//         valueForSelect=""
//         options={selectOptions}
//         viewBy={viewByOptions}
//       />,
//     );

//     const submitButton = screen.getByTestId('submit');
//     fireEvent.click(submitButton);

//     expect(await screen.findByText('This field is required')).toBeInTheDocument();
//   });

//   it('should show validation error when select options are empty', async () => {
//     render(
//       <MyForm
//         valueForSelect="committee"
//         options={[]}
//         viewBy={viewByOptions}
//       />,
//     );

//     const submitButton = screen.getByTestId('submit');
//     fireEvent.click(submitButton);

//     expect(await screen.findByText('This field is required')).toBeInTheDocument();
//   });

//   it('should call onSubmit function with form data', async () => {
//     const handleSubmit = jest.fn();

//     render(
//       <MyForm
//         valueForSelect="assigned"
//         options={selectOptions}
//         viewBy={viewByOptions}
//         onSubmit={handleSubmit}
//       />,
//     );

//     const submitButton = screen.getByTestId('submit');
//     fireEvent.click(submitButton);

//     expect(handleSubmit).toHaveBeenCalledWith({
//       value: 'assigned',
//       options: [],
//     });
//   });
});

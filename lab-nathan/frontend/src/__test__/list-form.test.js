import ListForm from '../components/list-form';

describe("ListForm", () => {
  it("creates a valid ListForm", () => {
    const listForm = new ListForm({});
    expect(listForm).toBeDefined();
    expect(listForm.state).toEqual({ title: '' });
    expect(listForm.handleSubmit).toBeInstanceOf(Function);
    expect(listForm.handleChange).toBeInstanceOf(Function);
  });
});
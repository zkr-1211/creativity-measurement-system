import { ref, reactive,createVNode } from "vue";
import { cloneDeep } from "lodash-es";
import { ExclamationCircleOutlined } from '@ant-design/icons-vue'
import { Modal } from "ant-design-vue";
export default function (data) {
  const rowSelection = {
    onChange: (selectedRowKeys: any, selectedRows: any) => {
      console.log(
        `selectedRowKeys: ${selectedRowKeys}`,
        "selectedRows: ",
        selectedRows
      );
    },
    getCheckboxProps: (record: { name: string }) => ({
      disabled: record.name === "Disabled User",
      // Column configuration not to be checked
      name: record.name,
    }),
  };
  const dataSource = ref(data);
  const editableData: any = reactive({});
  const onEdit = (key: string) => {
    editableData[key] = cloneDeep(
      dataSource.value.filter((item) => key === item.key)[0]
    );
  };
  const onDelete = (key: string) => {
    console.log(key);
    Modal.confirm({
      title: () => "Are you sure delete this task?",
      icon: () => createVNode(ExclamationCircleOutlined),
      content: () => "Some descriptions",
      okText: () => "Yes",
      okType: "danger",
      cancelText: () => "No",
      onOk() {
        dataSource.value = dataSource.value.filter((item) => item.key !== key);
      },
      onCancel() {
        console.log("Cancel");
      },
    });
  };
  const save = (key: string) => {
    Object.assign(
      dataSource.value.filter((item) => key === item.key)[0],
      editableData[key]
    );
    delete editableData[key];
  };
  const cancel = (key: string | number) => {
    delete editableData[key];
  };

  const modalText = ref<string>("Content of the modal");
  const visible = ref<boolean>(false);
  const confirmLoading = ref<boolean>(false);

  const showModal = () => {
    visible.value = true;
  };
  const handleCancel = () => {
    // formRef.value.resetFields();
  };
  const formRef = ref();
  return {
    dataSource,
    rowSelection,
    editableData,
    onEdit,
    onDelete,
    save,
    cancel,
    modalText,
    visible,
    confirmLoading,
    showModal,
    handleCancel,
    formRef,
  };
}

import {
  ConfigProvider,
  Layout,
  Menu,
  Statistic,
  Row,
  Col,
  PageHeader,
  Button,
  Progress,
  DatePicker,
  Pagination,
  Table,
  Tabs,
  Select,
  Input,
  Alert,
  Popconfirm,
  Tag,
  Tooltip,
  Image,
  Upload,
  Radio,
  Form,
  Collapse,
  Modal,
  message
} from 'ant-design-vue'

const plugins = [
  ConfigProvider,
  Layout,
  Menu,
  Statistic,
  Row,
  Col,
  PageHeader,
  Button,
  Progress,
  DatePicker,
  Pagination,
  Table,
  Tabs,
  Select,
  Input,
  Alert,
  Popconfirm,
  Tag,
  Tooltip,
  Image,
  Upload,
  Radio,
  Form,
  Collapse,
  Modal,
  message
]

export const setupAntd = (app: any, options = {}) => {
  app.config.globalProperties.$message = message
  plugins.forEach((plugin) => {
    app.use(plugin)
  })
}

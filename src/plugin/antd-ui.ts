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
  Skeleton,
  Card,
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
  Skeleton,
  Card,
  message
]

export const setupAntd = (app: any, options = {}) => {
  app.config.globalProperties.$message = message
  plugins.forEach((plugin) => {
    app.use(plugin)
  })
}

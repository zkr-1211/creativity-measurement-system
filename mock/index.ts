import { MockMethod } from "vite-plugin-mock";
import * as Mock from "mockjs";
import { lists, dataType } from "./data/list";
import { config } from "./apis";
import { listPaging } from "./utils";

export default [
  {
    url: "/api/get_list",
    method: "get",
    response: () => {
      return {
        code: 0,
        message: "ok",
        data: Mock.mock({
          "list|10": [
            {
              title: "@name",
              num: "@natural(1,1000)",
              percent: "@natural(1,100)",
            },
          ],
        }),
      };
    },
  },
  {
    url: "/api/four_item",
    method: "get",
    response: () => {
      return {
        code: 0,
        message: "ok",
        data: Mock.mock({
          list: [
            {
              title: "@name",
              count: "@natural(1,10000)",
              up: "@natural(1,50)",
              down: "@natural(1,50)",
              day: "@natural(1,250)",
            },
            {
              title: "@name",
              count: "@natural(1,10000)",
              "data|20": ["@natural(1,1000)"],
              day: "@natural(1,250)",
            },
            {
              title: "@name",
              count: "@natural(1,10000)",
              "data|20": ["@natural(1,1000)"],
            },
            {
              title: "@name",
              count: "@natural(1,10000)",
              percent: "@natural(50,100)",
            },
          ],
        }),
      };
    },
  },
  {
    url: "/api/table",
    method: "get",
    response: (config: config) => {
      const administratorList = lists.administratorList;
      const pageSize = Number(config.query.pageSize);
      const pageNum = Number(config.query.pageNum);
      console.log("administratorList", administratorList);

      return {
        code: 0,
        message: "ok",
        data: listPaging<dataType>(pageNum, pageSize, administratorList),
      };
    },
  },
  {
    url: "/api/tendency_run",
    method: "get",
    response: () => {
      return {
        code: 0,
        message: "ok",
        data: Mock.mock({
          list: [
            {
              data: {
                "datax|12": ["@natural(200,2000)"],
                "datay|12": ["@natural(1,12)月"],
              },
            },
            {
              "list|7": [
                {
                  title: "@name",
                  conut: "@natural(500,10000)",
                },
              ],
            },
          ],
        }),
      };
    },
  },
];

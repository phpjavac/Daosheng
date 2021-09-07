import { MockMethod } from 'vite-plugin-mock'


export default [
  /**
   * 练习
   * @return { name -> 练习名称  }
   */
   {
    url: "/api/practice/getPractice",
    method: "get",
    response: ({}) => {
      return {
        success: true,
        message: null,
        data: {
          id: "@uid",
          practiceType: "专项练习",
          userId: "@guid",
          name: "@cname",
          createTime: "@datetime",
          courseId: "@guid",
          complete: false,
        },
      };
    },
  },
    {
      url: '/api/get',
      method: 'get',
      response: ({ query }) => {
        return {
          code: 0,
          data: {
            name: '@time',
          },
        }
      },
    },
    {
      url: '/api/post',
      method: 'post',
      timeout: 2000,
      response: {
        code: 0,
        data: {
          name: 'vben',
        },
      },
    },
    {
      url: '/api/text',
      method: 'post',
      rawResponse: async (req, res) => {
        let reqbody = ''
        await new Promise((resolve) => {
          req.on('data', (chunk) => {
            reqbody += chunk
          })
          req.on('end', () => resolve(undefined))
        })
        res.setHeader('Content-Type', 'text/plain')
        res.statusCode = 200
        res.end(`hello, ${reqbody}`)
      },
    },{
      url:'/api/questionPerInfo',
      method:'post',
      timeout:1000,
      response:{
        code:0,
        data:{
          name:'@name',
          theClass:'@name',
          system:'@name',
          "totlaScore|1-100": 100,
        },
      },
    },{
      url:'/api/questionPageData',
      method:'post',
      timeout:1000,
      response:{
        code:0,
        data:{
          "pageItem|1-3":[
            {"pageNumber|1-100": 100,
             "question|1-10":[
              {
                id: '@id()',
                "index|1-100": 1,
                "type|1": ['单选题','多选题','填空题','判断题'],
                questionContent: '@ctitle(3, 5)',
                meta: "[\"<p>阿打算</p>\",\"<p>分手</p>\",\"<p>官方</p>\",\"<p>发顺丰的 </p>\"]",
                answer: {
                    isFlag: false,
                    isHeartFlag: false,
                    answer: ''
                },
            },
             ]
          },
          ]
        },
      },
    }
    
  ] as MockMethod[]
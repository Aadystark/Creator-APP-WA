export class SPCreatorProperties {
  columnR: any = []
  columnL: any = []
  tableName = '';
  innerJoinName = '';
  whereName = '';
  tableColumns: any = [];
  innerJoinOutput = '';
  conditionValue = '';
  parameters: any = [];
  spName = '';
  outPutData = ''
  userData: any = [];
  tabRefData: any = [];
  userWhereData: any = [];
  ddData: any = [];
  innerddData: any = [];
  dataSource: any;
  whereDataSource: any
  scriptType = '';
  spdDData: any = [];
  i = 0;
  j = 0;
  successMssg: string = '';
  whereCondition = '';
  whereList: any = [];
  tabRefName = '';
  addCondition = '';
  comparatorSelected = '';
  historicalData: any;
  comparators: any = ['=', '>', '<', '<>', '>=', '<=', 'IN', 'NOT IN', 'BETWEEN', 'NOT BETWEEN', 'IS NULL', 'IS NOT NULL', 'LIKE']
}

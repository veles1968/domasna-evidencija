module.exports = {
  dePool: {
    user: process.env.DE_USER,
    password: process.env.DE_PASSWORD,
    connectString: process.env.DE_CONNECTIONSTRING,
    libraryDir: "C:\\PRIVAT_DATA\\TOOLS\\ORACLE_instantclient_19_9",
    ////sssssssssssssss libraryDir: "",
    poolMin: 10,
    poolMax: 10,
    poolIncrement: 0,
  },
};

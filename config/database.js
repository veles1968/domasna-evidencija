module.exports = {
  dePool: {
    user: process.env.DE_USER,
    password: process.env.DE_PASSWORD,
    connectString: process.env.DE_CONNECTIONSTRING,
    // libraryDir: "C:\\PRIVAT_DATA\\TOOLS\\ORACLE_instantclient_19_9",
    // libraryDir: "$CLIENT_BUILD_DIR/instantclient",
    libraryDir: "$LD_LIBRARY_PATH",
    // libraryDir:      "$HOME/.oracle-build/instantclient/:/app/.apt/lib/x86_64-linux-gnu/${LD_LIBRARY_PATH:+:$LD_LIBRARY_PATH}",
    poolMin: 10,
    poolMax: 10,
    poolIncrement: 0,
  },
};

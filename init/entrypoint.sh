
/opt/mssql/bin/sqlservr &


for i in {1..30}; do
  /opt/mssql-tools/bin/sqlcmd -S localhost -U sa -P "$SA_PASSWORD" -Q "SELECT 1" > /dev/null 2>&1
  if [ $? -eq 0 ]; then
    echo "SQL Server is ready!"
    break
  fi
  sleep 1
done


if [ -f /init/init-database.sql ]; then
  echo "Running init-database.sql..."
  /opt/mssql-tools/bin/sqlcmd -S localhost -U sa -P "$SA_PASSWORD" -i /init/init-database.sql
fi

wait

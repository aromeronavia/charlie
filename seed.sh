for i in `seq 1 10000`; do
  MESSAGE="${fortune}"
  curl --data "message=$(fortune)" http://localhost:3000/
done

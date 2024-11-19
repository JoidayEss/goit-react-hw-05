import Error from "../../components/Error/Error";

const NotFoundPage = () => {
  return <Error status={"404"} message={"Oh no! Page not found:("} />;
};

export default NotFoundPage;

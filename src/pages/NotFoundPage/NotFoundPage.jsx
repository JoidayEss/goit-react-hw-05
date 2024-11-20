import Error from "../../components/ErrorMessage/ErrorMessage";

const NotFoundPage = () => {
  return <Error status={"404"} message={"Oh no! Page not found:("} />;
};

export default NotFoundPage;

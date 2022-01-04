import { useEffect } from "react";
import { useMoralis } from "react-moralis";
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";
import { GridWrapper, Row, Col } from "components/shared/Grid";

const App = ({ isServerInfo }) => {
  const { isWeb3Enabled, enableWeb3, isAuthenticated, isWeb3EnableLoading } = useMoralis();

  useEffect(() => {
    const connectorId = window.localStorage.getItem("connectorId");
    if (isAuthenticated && !isWeb3Enabled && !isWeb3EnableLoading) enableWeb3({ provider: connectorId });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAuthenticated, isWeb3Enabled]);

  return (
    <div>
      <GridWrapper>
        <Row>
          <Col width={2} overrides={{border:'solid blue'}}>some info</Col>
          <Col width={5} overrides={{border:'solid blue'}}>some more info</Col>
        </Row>
        <Row overrides={{border:'solid blue'}}>
          <Col width={10} overrides={{border:'solid blue'}}>some extra info</Col>
          <Col width={4} overrides={{border:'solid blue'}}>the final info</Col>
        </Row>
      </GridWrapper>
    </div>
  );
};


export default App;

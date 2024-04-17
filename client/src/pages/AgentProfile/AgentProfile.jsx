import React, { useState, useEffect } from "react";
import axios from "axios";
import DetailsCard from "../../components/Card/DetailsCard";
import GroupDropdown from "../../components/Dropdown/GroupDropdown";
import { useSelector, useDispatch } from "react-redux";
import { selectAgentGroup } from "../../redux/agentGroupSlice";
import { selectScenarioGroup } from "../../redux/scenarioGroupSlice";
import Signin from "../Signin/Signin";

const AgentProfile = () => {
  const [agentGroupOptions, setAgentGroupOptions] = useState([]);
  const [scenarioGroupOptions, setScenarioGroupOptions] = useState([]);
  const [selectedAgentGroup, setSelectedAgentGroup] =
    useState("Global Agent Group");
  const [selectedScenarioGroup, setSelectedScenarioGroup] = useState(
    "Default Scenario Group"
  );
  const { currentUser } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchAgentGroupOptions = async () => {
      // Get agent Groups
    };
    const fetchScenarioGroupOptions = async () => {
      // Get Scenario groups
    };
    fetchAgentGroupOptions();
    fetchScenarioGroupOptions();
  }, [currentUser._id, dispatch]);

  const handleAgentGroupSelect = (option) => {
    setSelectedAgentGroup(option);
    dispatch(selectAgentGroup(option));
  };

  const handleScenarioGroupSelect = (option) => {
    setSelectedScenarioGroup(option);
    dispatch(selectScenarioGroup(option));
  };

  return (
    <>
      {!currentUser ? (
        <Signin />
      ) : (
        <div className="flex h-screen w-auto">
          <div className="flex-1  border-black">
            <GroupDropdown type={"agent"} isGrey={true} />
          </div>
          <div className="flex-1  border-black">
            <GroupDropdown type={"scenario"} />
          </div>
        </div>
      )}
    </>
  );
};

export default AgentProfile;

import Scenario from '../models/Scenario.js';

export const createScenario = async (req, res, next) => {
    try {
        const scenario = new Scenario(req.body);
        const savedScenario = await scenario.save();
        res.status(201).json(savedScenario);
    } catch (err) {
        next(err);
    }
};


export const getScenario = async (req, res, next) => {
    try {
        const scenario = await Scenario.findById(req.params.id);
        res.status(200).json(scenario);
    } catch (err) {
        next(err);
    }
};


export const deleteScenario = async (req, res, next) => {
    try {
        await Scenario.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: "Scenario deleted successfully" });
    } catch (err) {
        next(err);
    }
};

export const rollbackTillScenario = async (req, res, next) => {

    // get scenario group->delete scenarios made after the target scenario->delete the currect scenario->delete tweets generated by that agent group till that timestamp
    let rollbackNeeded = false;
    try {

        const targetScenarioGroup = await ScenarioGroup.findById(req.params.scenarioGroupId);
        const targetScenario = await Scenario.findById(req.params.targetScenarioId);
        const scenariosToDelete = await Scenario.find({
            _id: { $in: targetScenarioGroup.scenarioIds },
            createdAt: { $gt: targetScenario.createdAt }
        });


        const session = await mongoose.startSession();
        session.startTransaction();

        await Scenario.deleteMany({ _id: { $in: scenariosToDelete.map(scenario => scenario._id) } }, { session });
        await Scenario.findByIdAndDelete(targetScenario._id, { session });

        await Tweet.deleteMany({
            agentId: targetScenario.agentId,
            createdAt: { $gt: targetScenario.createdAt }
        }, { session });

        await session.commitTransaction();
        session.endSession();

        res.status(200).json({ message: "Scenario rollbacked successfully" });
    } catch (err) {
        rollbackNeeded = true;
        next(err);
    } finally {

        if (rollbackNeeded) {
            try {
                await session.abortTransaction();
            } catch (abortError) {
                next(abortError);
            } finally {
                session.endSession();
            }
        }
    }
};

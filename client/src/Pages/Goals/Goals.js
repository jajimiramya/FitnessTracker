import DailyGoals from "./DailyGoals";
import HistoricalGoals from "./GoalsProgress";

const Goals = () => {
  return (
    <div className="max-w-4xl mx-auto p-6 bg-gray-100 rounded-lg shadow-lg">
      <h1 className="text-3xl font-bold text-center mb-6">Your Daily Goals</h1>

      {/* Daily Goals Form */}
      <DailyGoals />

      {/* Historical Progress Section */}
      <div className="mt-8">
        <h2 className="text-2xl font-semibold mb-4">Progress Over Time</h2>
        <HistoricalGoals />
      </div>
    </div>
  );
};

export default Goals;

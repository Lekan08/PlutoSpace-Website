/* eslint-disable import/order */
/* eslint-disable import/no-named-as-default-member */
/* eslint-disable import/no-named-as-default */
/**
 =========================================================
 * Material Dashboard 2 React - v2.0.0
 =========================================================

 * Product Page: https://www.creative-tim.com/product/material-dashboard-react
 * Copyright 2021 Creative Tim (https://www.creative-tim.com)

 Coded by www.creative-tim.com

  =========================================================

 * The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
 */

/**
   All of the routes for the Soft UI Dashboard React are added here,
   You can add a new route, customize the routes and delete the routes here.

   Once you add a new route on this file it will be visible automatically on
   the Sidenav.

   For adding a new route you can follow the existing routes in the routes array.
   1. The `type` key with the `collapse` value is used for a route.
   2. The `type` key with the `title` value is used for a title inside the Sidenav.
   3. The `type` key with the `divider` value is used for a divider between Sidenav items.
   4. The `name` key is used for the name of the route on the Sidenav.
   5. The `key` key is used for the key of the route (It will help you with the key prop inside a loop).
   6. The `icon` key is used for the icon of the route on the Sidenav, you have to add a node.
   7. The `collapse` key is used for making a collapsible item on the Sidenav that has other routes
   inside (nested routes), you need to pass the nested routes inside an array as a value for the `collapse` key.
   8. The `route` key is used to store the route location which is used for the react router.
   9. The `href` key is used to store the external links location.
   10. The `title` key is only for the item with the type of `title` and its used for the title text on the Sidenav.
   10. The `component` key is used to store the component of its route.
 */

// Material Dashboard 2 React layouts
import Dashboard from "layouts/dashboard";
import SignIn from "layouts/authentication/sign-in";
import ChatRating from "layouts/authentication/chat-Rating";
import SignUp from "layouts/authentication/sign-up";

import ChangePassword from "layouts/authentication/changepassword";
import Userlogin from "layouts/authentication/userlogin";
import Position from "layouts/position";

// @mui icons
import Icon from "@mui/material/Icon";
import CBT from "layouts/cbt";
import Departments from "layouts/departments";
import Roles from "layouts/companyroles";
import Status from "layouts/companystatustype";
import Announcement from "layouts/announcement";
import AnnouncementType from "layouts/announcementtype";
import Steps from "layouts/companysteps";
import Branches from "layouts/branches/index";
import UpdateBranch from "layouts/branches/data/updateBranch";
import CreateBranch from "layouts/authentication/companyRegistration/createBranch";
import CompanyReg from "layouts/authentication/companyRegistration";
import SysRoles from "layouts/systemRoles";
import RolesAndPerms from "layouts/systemRoles/addRolesAndPerms";
import TimeOffType from "layouts/timeofftype";
import UserManagement from "layouts/userManagement";
import UserProfile from "layouts/userProfile";
import CompanyProfile from "layouts/companiesProfile";
import ViewUser from "layouts/userManagement/viewUser";
import MyonBoarding from "layouts/myonboarding";
import MyoffBoarding from "layouts/myoffboarding";
import Groupview from "layouts/groupview";
import ForgotPass from "layouts/authentication/forgot-password";
import ComForgotPass from "layouts/authentication/complete-forgotPassword";
import UserAudit from "layouts/userHistory";
import InviteUser from "layouts/inviteUser";
import FreeDay from "layouts/free-days";
import Checklists from "layouts/checklists";
import UserTOT from "layouts/userManagement/userTimeOffType";

import TimeOffRequests from "layouts/timeoffRequests";
import ForbiddenPage from "layouts/authentication/forbiddenPage";
import AddTimeOffType from "layouts/timeofftype/addDetailsToTimeOffType";
import AddUserpayment from "layouts/userManagement/addUserSalaryToUserManagement";
import PaymentHis from "layouts/paymentHistory";
import Birthdays from "layouts/birthdays/data/birthdays";
import TimeOffRequestJourney from "layouts/timeoffRequests/timeOffRequestJourney";
import ForwardTimeOff from "layouts/timeoffRequests/forwardTimeOffRequests";
import MattersArising from "layouts/mattersArising";
import EditMattersArising from "layouts/mattersArising/update";
import ChatApp from "layouts/mattersArising/viewMatter/App";
import RenewLog from "layouts/authentication/renewSubscription/renewLogin";
import RenewSub from "layouts/authentication/renewSubscription";
import SalaryPayment from "layouts/salaryPayment";

import Bonusdeduction from "layouts/bonusdeduction";
import MyBills from "layouts/my-Bills";
import Accounting from "layouts/accounting";
import MySubscription from "layouts/subscription";
import GeneralBills from "layouts/general-Bill";
import GeneralSubscription from "layouts/general-Subscription";
import UpdateMyBills from "layouts/my-Bills/update-My-Bills/index";
import UpdateMySubscription from "layouts/subscription/update-Subscription/index";
import CloneBonusDeduction from "layouts/bonusdeduction/clone";
import UpdateBonusOrDeduction from "layouts/bonusdeduction/update";
import GroupNotifications from "layouts/group-notifications";
import Groups from "layouts/groups";
import JobPost from "layouts/jobposts";
import ViewParticularjob from "layouts/jobposts/GetJobPost/viewjobasHR";
import UpdateJobPost from "layouts/jobposts/UpdateJobPost";
import AppraisalQues from "layouts/appraisal/appraisalQuestions";
import VuAppraisalQuestion from "layouts/appraisal/appraisalQuestions/viewAppraisalQues";
import AppraisalGrade from "layouts/appraisal/appraisalGrading";
// import View from "layouts/timeoffRequests/view";
import TimeoffRequestUpdate from "layouts/timeoffRequests/update";
import SalaryTime from "layouts/salaryPayment/salaryTime";
import SalaryProrate from "layouts/salaryPayment/salaryProrate";
import VuUserProrate from "layouts/salaryPayment/salaryProrate/viewUserProrate";
import SalaryAdvance from "layouts/salary-advance";
import UpdateSalaryAdvance from "layouts/salary-advance/update-salary-advance";

import Appraisal from "layouts/appraisal/appraisal";
import ViewAppraisal from "layouts/appraisal/appraisal/viewAppraisal";
import ViewResult from "layouts/appraisal/appraisal/viewAppraisalResult";
import Polls from "layouts/polls";
import Project from "layouts/project";
import SetAppraisalQuestion from "layouts/appraisal/appraisal/questions";
import ApproveApp from "layouts/appraisal/appraisal/approveAppraisal";
import AppraisalAppraisers from "layouts/appraisal/appraisers";
import AppraiseQandA from "layouts/appraisal/appaisalQandA";
import GradeAppraisal from "layouts/appraisal/appraisalResult";

import UpdateAnnouncement from "layouts/announcement/updateannouncement";
import UpdateSystemRole from "layouts/userManagement/updatesystemrole";
import UpdatePolls from "layouts/polls/updatepolls";
import Addpolloptions from "layouts/polls/addpolloptions";
import Disapprove from "layouts/timeoffRequests/disapprove";
import VotePolls from "layouts/polls/votePolls";
import EscalateMatter from "layouts/mattersArising/escalateMatter";
import PollsView from "layouts/polls/view";
import UpdateAppraisalGrading from "layouts/appraisal/appraisalGrading/update";
import Tax from "layouts/tax";
import TaxRemittance from "layouts/tax-Remittance-Personal";
import TaxRemittanceOrg from "layouts/tax-Remittance-Organisation";
import RecruitmentGrading from "layouts/recruitmentGrading";
import RecruitmentUpdate from "layouts/recruitmentGrading/updateRecruitmentGrading";
import TestQuestion from "layouts/testQuestions/index";
import Updatetest from "layouts/testQuestions/updatetest";
import SingleCorporate from "layouts/singleCorporate/index";
import UpdateSingleCorporate from "layouts/singleCorporate/update";
import ViewSingleCorporate from "layouts/singleCorporate/view";
import TestOptions from "layouts/testQuestions/options";
import Leads from "layouts/leads/index";
import UpdateLeads from "layouts/leads/update";
import ViewLead from "layouts/leads/view";
import SingleIndividual from "layouts/singleIndividual/index";
import UpdateSingleIndividual from "layouts/singleIndividual/update";
import Answer from "layouts/testQuestions/answer/index";
import ViewSingleIndividual from "layouts/singleIndividual/view";
import Question from "layouts/cbt/question/index";
import Workflow from "layouts/workFlow";
// import WorkflowLead from "layouts/leads/workflow";
import Tickets from "layouts/tickets";
import TicketChatApp from "layouts/tickets/chat/App";
import TicketSettings from "layouts/tickets/ticketSettings";
import Stage from "layouts/stage";
import Supply from "layouts/supply/index";
import StageCondition from "layouts/stage/Stage-Condition";
import Demand from "layouts/demand";
import DemandStat from "layouts/demandStat";
import SupplyUpdate from "layouts/supply/updateSupply";
import Supplystat from "layouts/supplystats";
import Products from "layouts/products";
import UpdateProducts from "layouts/products/update";
// import UpdateSessions from "layouts/onboardingCompany/sessions/update";
import Updateonboarding from "layouts/onboardingCompany/updateonboarding";
import Updateoffboarding from "layouts/offboardingCompany/updateoffboarding";
import ViewProducts from "layouts/products/viewproducts";
import ProductsBranch from "layouts/products/products-Branch";
import ViewSupply from "layouts/supply/viewSupply";
// import AssignCbtQuestion from "layouts/cbt/assignCbtTestQuestion";
import DemandUpdate from "layouts/demand/update-Demand";
import ConvertDemandToSupply from "layouts/demand/convert-Demand-To-Supply";
import ViewDemand from "layouts/demand/view-Demand";
import Pipeline from "layouts/pipeline";
import AddStage from "layouts/workFlow/add-Stage";
import CbtAnswer from "layouts/cbt/answer/index"; // /cbt/answer/
import AddQuesToCBT from "layouts/cbt/addquestions";
// /testQuestions/questions/
import ViewJobApplications from "layouts/jobposts/applications";
import ViewTestQuestions from "layouts/testQuestions/view";
// import TakeCbtQuestion from "layouts/cbt/takeCbtQuestion";
import ReportProduction from "layouts/products/reportProduction";
import TicketDashboard from "layouts/ticketDashboard";
import AppraisalDashboard from "layouts/appraisal-dashboard";
import AnnouncementDashboard from "layouts/announcement-Dashboard";
import InterviewSchedule from "layouts/interviewSchedule";
import ScheduledInterview from "layouts/interviewSchedule/scheduled-Interview";
import InterviewDate from "layouts/interviewSchedule/Interview-Date";
import Accessor from "layouts/myAccessor";
import Appointments from "layouts/appointments";
import MyCalendar from "layouts/myCalendar";
import UpdateCalendar from "layouts/appointments/updateAppointment";
import DocumentLibrary from "layouts/documentLibrary";
import UpdateReportProduction from "layouts/products/reportProduction/update";
import ProjectUpdate from "layouts/project/update-Project";
import ProjectView from "layouts/project/view-Project";
import Subtask from "layouts/project/subtask";
import Updatesub from "layouts/project/updatesubtask";
import ViewApplication from "layouts/jobposts/applications/viewApplication";
import DemandSupply from "layouts/demandSupplyStat";
import AddWorkflowToJobpost from "layouts/jobposts/applications/addToWorkflow";
import ViewCalendar from "layouts/myAccessor/viewCalendar";
import CLientLevel from "layouts/clientLevel";
import WelcomeCbt from "layouts/cbt/instruction";
import TakeCBT from "layouts/cbt/takeCbt";
import Reports from "layouts/reports";
import DeclineReportProduction from "layouts/products/reportProduction/declineReportProduction/";
import TicketClientSettings from "layouts/tickets/ticketClientSettings";

import Pension from "layouts/pension";
import UpdatePension from "layouts/pension/update";
import UserPension from "layouts/pension/userPension";
import ViewUserPension from "layouts/pension/viewUserPension";
import UpdateUserPension from "layouts/companyPension/updateUserPension";
import CompanyPension from "layouts/companyPension";
import AddPension from "layouts/companyPension/addPension";
import MyPension from "layouts/myPension";
import ThirdParty from "layouts/third-Party";
import BusinessTravel from "layouts/businessTravel";
import UpdateBusinessTravel from "layouts/businessTravel/update";
import BusinessTravelDashboard from "layouts/businesstravel-dashboard";
import MarkAsCompleted from "layouts/businessTravel/mark-as-completed";
import ViewBusiness from "layouts/businessTravel/view";
import AttachDocument from "layouts/businessTravel/attach-document";
import ForwardApproval from "layouts/businessTravel/forwardforapproval";
import TimeSheetManual from "layouts/timesheet";
import UpdateTimesheet from "layouts/timesheet/update-Timesheet";
import TimeOffRequestsDashboard from "layouts/timeoffrequest-dashboard";
// import FunctionalComponent from "layouts/businesstravel-dashboard/exportpdf";
// import Html from "layouts/businesstravel-dashboard/exporthtml";

import VideoChat from "layouts/videoChat";
import OnboardingSession from "layouts/onboardingCompany/sessions";
import AssignedOnboarding from "layouts/assignedOnboarding";
import OffboardingSession from "layouts/offboardingCompany/sessions";
import MultiSessionOffboarding from "layouts/offboardingCompany/sessions/multisession";
import AssignedOffboarding from "layouts/assignedOffboarding";
import GenerateProductionReport from "layouts/products/reportProduction/generateProductionReport";
import OtherInflowType from "layouts/otherInflowType";
import OtherInflow from "layouts/otherInflow";
import UpdateOtherInflow from "layouts/otherInflow/update";
import FilterOtherInflow from "layouts/otherInflow/filterOtherInflow";
import Sales from "layouts/sales";
import CreditFacility from "layouts/creditFacility";
import MakePayment from "layouts/creditFacility/makepayment";
import ViewCreditFacility from "layouts/creditFacility/view";
import LeadsWorkflow from "layouts/leadsWorkflow";
import AssignCbtToJobPost from "layouts/cbt/assignCbtToJobPost";
import ViewResultsAdmin from "layouts/cbt/viewResults";
import SalesPayment from "layouts/sales/salesPayment";
import FilterSales from "layouts/sales/filterSales";
import Services from "layouts/services";
import UpdateService from "layouts/services/update";
import SBranches from "layouts/services/branches";
import AttachPlanCheckox from "layouts/insuranceTypes/attachPlan";
import InsuranceTypes from "layouts/insuranceTypes";
import InsurancePlans from "layouts/insurancePlans";
import Insurance from "layouts/insurance";
import InsuranceUpdate from "layouts/insurance/update";
import InsuranceView from "layouts/insurance/view";
import InsuranceContribution from "layouts/insurance/contribution";
import InsuranceDamage from "layouts/insurance/damage";
import UpdateInsuranceDamage from "layouts/insurance/damage/data/update";
import AssetTypes from "layouts/asset-Types";
import UpdateAssetTypes from "layouts/asset-Types/update";
import Assets from "layouts/assets";
import UpdateAssets from "layouts/assets/update";
import CompanyAssets from "layouts/company-Assets";
import CustomerAssets from "layouts/customer-Assets";
import AssetAttachDocument from "layouts/assets/attachDocuments";
import Coupons from "layouts/coupons";
import UpdateCoupons from "layouts/coupons/update";
import AppointmentOffboardingSession from "layouts/assignedOffboarding/appointmentSession";
import TreasuryType from "layouts/treasuryType";
import UpdateTreasuryType from "layouts/treasuryType/update";
import Treasury from "layouts/treasury";
import TreasuryContribution from "layouts/treasury/treasuryContribution";
import UpdateTreasuryContribution from "layouts/treasury/treasuryContribution/update";
import TreasuryDebtors from "layouts/treasury/treasuryGetDebtors";

import AppraisalHistory from "layouts/appraisal/appraisalHistory";
import MultiSession from "layouts/onboardingCompany/sessions/multisession";
import Accounts from "layouts/accounting-main";
import AccountSheet from "layouts/accounting-main/account-sheet";
import OnboardingCompany from "./layouts/onboardingCompany";
import OffboardingCompany from "./layouts/offboardingCompany";
import UpdateOnboardingSession from "./layouts/onboardingCompany/sessions/update";
import UpdateOffboardingSession from "./layouts/offboardingCompany/sessions/update";
import Voucher from "./layouts/voucher/index";
import OnboardingChecklist from "./layouts/onboardingCompany/onboardingChecklist";

import GeneralLedger from "layouts/general-ledger";
import PostTransactions from "./layouts/general-ledger/postTransactions/index";

const routes = [
  {
    type: "collapse",
    name: "Dashboard",
    key: "dashboard",
    icon: <Icon fontSize="small">dashboard</Icon>,
    route: "/dashboard",
    component: <Dashboard />,
  },
  {
    type: "collapse",
    name: "Appointment",
    key: "appointments",
    icon: <Icon fontSize="small">today</Icon>,
    route: "/appointments",
    component: <Appointments />,
  },
  {
    type: "collapse",
    name: "Calendar",
    key: "my-calendar",
    icon: <Icon fontSize="small">today</Icon>,
    route: "/my-calendar",
    component: <MyCalendar />,
  },
  {
    type: "collapse",
    name: "Birthdays",
    key: "birthdays",
    icon: <Icon fontSize="small">supervised_user_circle</Icon>,
    route: "/birthdays",
    component: <Birthdays />,
  },
  {
    type: "collapse",
    name: "Document Library",
    key: "documentLibrary",
    icon: <Icon fontSize="small">create_new_folder</Icon>,
    route: "/Document-Library",
    component: <DocumentLibrary />,
  },
  {
    type: "collapse",
    name: "Matters Arising",
    key: "mattersarising",
    icon: <Icon fontSize="small">meeting_room</Icon>,
    route: "/matters-Arising",
    component: <MattersArising />,
  },
  {
    name: "Escalate Matter",
    key: "escalatematter",
    icon: <Icon fontSize="small">meeting_room</Icon>,
    route: "/matters-Arising/escalateMatter",
    component: <EscalateMatter />,
  },
  {
    name: "Chats",
    key: "viewMatter",
    icon: <Icon fontSize="small">meeting_room</Icon>,
    route: "/view-Matter",
    component: <ChatApp />,
  },
  {
    name: "Edit Matters Arising",
    key: "editmattersarising",
    icon: <Icon fontSize="small">meeting_room</Icon>,
    route: "/matters-Arising/update",
    component: <EditMattersArising />,
  },
  {
    type: "collapse",
    name: "Polls",
    key: "polls",
    icon: <Icon fontSize="small">meeting_room</Icon>,
    route: "/polls",
    component: <Polls />,
  },
  {
    name: "Update polls",
    key: "updatepolls",
    icon: <Icon fontSize="small">meeting_room</Icon>,
    route: "/Update-Poll",
    component: <UpdatePolls />,
  },
  {
    name: "Add Poll Option",
    key: "editaddpolloption",
    icon: <Icon fontSize="small">meeting_room</Icon>,
    route: "/polls/Option",
    component: <Addpolloptions />,
  },
  {
    name: "View polls",
    key: "viewpolls",
    icon: <Icon fontSize="small">meeting_room</Icon>,
    route: "/polls/vote-polls",
    component: <VotePolls />,
  },
  {
    name: "Vote polls",
    key: "votepolls",
    icon: <Icon fontSize="small">meeting_room</Icon>,
    route: "/polls/view",
    component: <PollsView />,
  },
  {
    type: "collapse",
    name: "Video Chat",
    key: "videoChat",
    icon: <Icon fontSize="small">video_call</Icon>,
    route: "/video-chat",
    component: <VideoChat />,
  },
  {
    type: "collapse",
    name: "User Management",
    key: "userManagement",
    icon: <Icon fontSize="small">supervised_user_circle</Icon>,
    route: "/user-Management",
    component: <UserManagement />,
  },
  {
    type: "collapse",
    name: "Reports",
    key: "reports",
    icon: <Icon fontSize="small">supervised_user_circle</Icon>,
    route: "/reports",
    component: <Reports />,
  },
  {
    type: "collapse",
    name: "Third Party",
    key: "thirdParty",
    icon: <Icon fontSize="small">meeting_room</Icon>,
    route: "/third-Party",
    component: <ThirdParty />,
  },
  {
    type: "divider",
    name: "",
    key: "divd1Accounting",
    route: "",
  },
  {
    type: "title",
    title: "Accounting",
    key: "titd2Accounting",
    route: "",
  },
  {
    type: "collapse",
    name: "Accounts",
    key: "accounting-main",
    icon: <Icon fontSize="small">today</Icon>,
    route: "/accounts",
    component: <Accounts />,
  },
  {
    name: "Account Sheet",
    key: "accounting-sheet",
    icon: <Icon fontSize="small">today</Icon>,
    route: "/accounts/account-sheet",
    component: <AccountSheet />,
  },
  {
    type: "collapse",
    name: "Accounting",
    key: "accounting",
    icon: <Icon fontSize="small">today</Icon>,
    route: "/accounting",
    component: <Accounting />,
  },
  {
    type: "collapse",
    name: "General Ledger",
    key: "generalLedger",
    icon: <Icon fontSize="small">receipt_long</Icon>,
    route: "/general-ledger",
    component: <GeneralLedger />,
  },
  {
    name: "Post Transaction",
    key: "generalLedger",
    icon: <Icon fontSize="small">receipt_long</Icon>,
    route: "/general-ledger/post-transaction",
    component: <PostTransactions />,
  },
  {
    type: "divider",
    name: "",
    key: "divd32",
    route: "",
  },
  {
    type: "title",
    title: "Announcement",
    key: "titd32",
    route: "",
  },
  {
    type: "collapse",
    name: "Dashboard",
    key: "announcementDashboard",
    icon: <Icon fontSize="small">book_online</Icon>,
    route: "/announcement-Dashboard",
    component: <AnnouncementDashboard />,
  },
  {
    type: "collapse",
    name: "Announcement",
    key: "announcement",
    icon: <Icon fontSize="small">receipt_long</Icon>,
    route: "/Announcement",
    component: <Announcement />,
  },
  {
    name: "Update announcement",
    key: "updateannouncement",
    icon: <Icon fontSize="small">meeting_room</Icon>,
    route: "/Update-Announcement",
    component: <UpdateAnnouncement />,
  },
  {
    type: "collapse",
    name: "Announcement Type",
    key: "announcementtype",
    icon: <Icon fontSize="small">receipt_long</Icon>,
    route: "/Announcement-Type",
    component: <AnnouncementType />,
  },
  {
    type: "divider",
    name: "",
    key: "divd42",
    route: "",
  },
  {
    type: "title",
    title: "Appraisal",
    key: "titd42",
    route: "",
  },
  {
    type: "collapse",
    name: "Dashboard",
    key: "appraisal-Dashboard",
    icon: <Icon fontSize="small">book_online</Icon>,
    route: "/appraisal-Dashboard",
    component: <AppraisalDashboard />,
  },
  {
    type: "collapse",
    name: "Appraisals",
    key: "appraisalz",
    icon: <Icon fontSize="small">rate_review</Icon>,
    route: "/Appraisals",
    component: <Appraisal />,
  },
  {
    type: "collapse",
    name: "Appraisal History",
    key: "appraisalHistory",
    icon: <Icon fontSize="small">rate_review</Icon>,
    route: "/Appraisal-History",
    component: <AppraisalHistory />,
  },
  {
    name: "View Appraisal",
    key: "viewAppraisal",
    icon: <Icon fontSize="small">receipt_long</Icon>,
    route: "/Update-Appraisals",
    component: <ViewAppraisal />,
  },
  {
    name: "Appraisal Results",
    key: "ViewResult",
    icon: <Icon fontSize="small">receipt_long</Icon>,
    route: "/Appraisals/Result",
    component: <ViewResult />,
  },
  {
    name: "Set Appraisal Questions",
    key: "setAppraisalQuestions",
    icon: <Icon fontSize="small">receipt_long</Icon>,
    route: "/Set-Appraisal-Questions",
    component: <SetAppraisalQuestion />,
  },
  {
    name: "Grade Appraisal",
    key: "gradeAppraisal",
    icon: <Icon fontSize="small">receipt_long</Icon>,
    route: "/Grade-Appraisal",
    component: <GradeAppraisal />,
  },
  {
    name: "Set Appraisal Appraisers",
    key: "setAppraisalAppraisers",
    icon: <Icon fontSize="small">receipt_long</Icon>,
    route: "/Set-Appraisal-Appraisers",
    component: <AppraisalAppraisers />,
  },
  {
    name: "Approve Appraisal",
    key: "approveAppraisal",
    icon: <Icon fontSize="small">receipt_long</Icon>,
    route: "/Appraisals/Approve-Appraisal",
    component: <ApproveApp />,
  },
  {
    type: "collapse",
    name: "Appraisal Questions",
    key: "appraisalQuestions",
    icon: <Icon fontSize="small">receipt_long</Icon>,
    route: "/Appraisal-Questions",
    component: <AppraisalQues />,
  },
  {
    name: "Appraisal Answers",
    key: "appraisalQandA",
    icon: <Icon fontSize="small">receipt_long</Icon>,
    route: "/Appraisal-Question-and-Answers",
    component: <AppraiseQandA />,
  },
  {
    name: "Update Appraisal Questions",
    key: "viewAppraisalQues",
    icon: <Icon fontSize="small">receipt_long</Icon>,
    route: "/Update-Appraisal-Questions",
    component: <VuAppraisalQuestion />,
  },
  {
    type: "collapse",
    name: "Appraisal Grading",
    key: "appraisalGrading",
    icon: <Icon fontSize="small">receipt_long</Icon>,
    route: "/Appraisal-Grading",
    component: <AppraisalGrade />,
  },
  {
    name: "Update appraisal grading",
    key: "updateappraisalgrading",
    icon: <Icon fontSize="small">meeting_room</Icon>,
    route: "/appraisal/update",
    component: <UpdateAppraisalGrading />,
  },
  {
    type: "divider",
    name: "",
    key: "divd444",
    route: "",
  },
  {
    type: "title",
    title: "Assets",
    key: "titd444",
    route: "",
  },
  {
    type: "collapse",
    name: "Asset-Types",
    key: "assetTypes",
    icon: <Icon fontSize="small">assignment</Icon>,
    route: "/asset-Types",
    component: <AssetTypes />,
  },
  {
    name: "Update Asset-Types",
    key: "updateassetTypes",
    icon: <Icon fontSize="small">assignment</Icon>,
    route: "/asset-Types/update",
    component: <UpdateAssetTypes />,
  },
  {
    type: "collapse",
    name: "Asset",
    key: "assets",
    icon: <Icon fontSize="small">assignment</Icon>,
    route: "/asset",
    component: <Assets />,
  },
  {
    name: "Update Asset",
    key: "updateasset",
    icon: <Icon fontSize="small">assignment</Icon>,
    route: "/asset/update",
    component: <UpdateAssets />,
  },
  {
    name: "Attach Documents",
    key: "attachDocuments",
    icon: <Icon fontSize="small">assignment</Icon>,
    route: "/asset/attach-Documents",
    component: <AssetAttachDocument />,
  },
  {
    type: "collapse",
    name: "Company Asset",
    key: "companyasset",
    icon: <Icon fontSize="small">assignment</Icon>,
    route: "/company-Asset",
    component: <CompanyAssets />,
  },
  {
    type: "collapse",
    name: "Customer Asset",
    key: "customerassets",
    icon: <Icon fontSize="small">assignment</Icon>,
    route: "/customer-Asset",
    component: <CustomerAssets />,
  },
  {
    type: "divider",
    name: "",
    key: "divd1Bills",
    route: "",
  },
  {
    type: "title",
    title: "Bills",
    key: "titd2Bills",
    route: "",
  },
  {
    type: "collapse",
    name: "Bills",
    key: "myBills",
    icon: <Icon fontSize="small">today</Icon>,
    route: "/my-Bills",
    component: <MyBills />,
  },
  {
    type: "collapse",
    name: "Bills Attention",
    key: "billsAttention",
    icon: <Icon fontSize="small">today</Icon>,
    route: "/Bills-Attention",
    component: <GeneralBills />,
  },
  {
    type: "collapse",
    name: "Voucher Attention",
    key: "voucherAttention",
    icon: <Icon fontSize="small">today</Icon>,
    route: "/Voucher-Attention",
    component: <Voucher />,
  },
  {
    name: "Update Bills",
    key: "updateMyBills",
    icon: <Icon fontSize="small">today</Icon>,
    route: "/my-Bills/update-My-Bills",
    component: <UpdateMyBills />,
  },
  {
    type: "divider",
    name: "",
    key: "divd12",
    route: "",
  },
  {
    type: "title",
    title: "Business Travel",
    key: "titbt2",
    route: "",
  },
  {
    type: "collapse",
    name: "Dashboard",
    key: "businesstravelupdate",
    icon: <Icon fontSize="small">assignment</Icon>,
    route: "/business-Travel-Dashboard",
    component: <BusinessTravelDashboard />,
  },
  {
    type: "collapse",
    name: "Business Travel",
    key: "businesstravel",
    icon: <Icon fontSize="small">assignment</Icon>,
    route: "/business-travel",
    component: <BusinessTravel />,
  },
  {
    // type: "collapse",
    name: "Update Business Travel",
    key: "businesstravelupdate",
    icon: <Icon fontSize="small">assignment</Icon>,
    route: "/business-travel/update",
    component: <UpdateBusinessTravel />,
  },
  {
    // type: "collapse",
    name: "Mark As Completed",
    key: "markAsCompleted",
    icon: <Icon fontSize="small">assignment</Icon>,
    route: "/business-travel/mark-as-completed",
    component: <MarkAsCompleted />,
  },
  {
    // type: "collapse",
    name: "View Business Travel",
    key: "businesstravelview",
    icon: <Icon fontSize="small">assignment</Icon>,
    route: "/business-travel/view",
    component: <ViewBusiness />,
  },
  {
    // type: "collapse",
    name: "Attach Document",
    key: "attachdocument",
    icon: <Icon fontSize="small">assignment</Icon>,
    route: "/business-travel/attach-document",
    component: <AttachDocument />,
  },
  {
    // type: "collapse",
    name: "Forward for Approval",
    key: "businesstravelforward",
    icon: <Icon fontSize="small">assignment</Icon>,
    route: "/business-travel/forward-for-approval",
    component: <ForwardApproval />,
  },
  {
    type: "divider",
    name: "",
    key: "divd97",
    route: "",
  },
  {
    type: "title",
    title: "Clients",
    key: "titd97",
    route: "",
  },
  {
    type: "collapse",
    name: "Leads",
    key: "leads",
    icon: <Icon fontSize="small">location_searching</Icon>,
    route: "/leads",
    component: <Leads />,
  },
  {
    name: "Update Leads",
    key: "leads/update",
    icon: <Icon fontSize="small">person_add_alt1</Icon>,
    route: "leads/update",
    component: <UpdateLeads />,
  },
  {
    name: "View Lead",
    key: "leads/view",
    icon: <Icon fontSize="small">person_add_alt1</Icon>,
    route: "leads/view",
    component: <ViewLead />,
  },
  // {
  //   name: "view Single Individual",
  //   key: "singleIndividual/view",
  //   icon: <Icon fontSize="small">receipt_long</Icon>,
  //   route: "/Individual/view",
  //   component: <ViewSingleIndividual />,
  // },
  {
    type: "collapse",
    name: "Individual",
    key: "individual",
    icon: <Icon fontSize="small">person_add_alt1</Icon>,
    route: "/Individual",
    component: <SingleIndividual />,
  },
  {
    type: "collapse",
    name: "Corporate",
    key: "corporate",
    icon: <Icon fontSize="small">receipt_long</Icon>,
    route: "/Corporate",
    component: <SingleCorporate />,
  },
  {
    name: "Update Single Corporate",
    key: "singleCorporate/update",
    icon: <Icon fontSize="small">receipt_long</Icon>,
    route: "/Corporate/update",
    component: <UpdateSingleCorporate />,
  },
  {
    name: "view Single Corporate",
    key: "singleCorporate/view",
    icon: <Icon fontSize="small">receipt_long</Icon>,
    route: "/Corporate/view",
    component: <ViewSingleCorporate />,
  },
  {
    name: "Update Single Individual",
    key: "singleIndividual/update",
    icon: <Icon fontSize="small">person_add_alt1</Icon>,
    route: "Individual/update",
    component: <UpdateSingleIndividual />,
  },
  {
    name: "view Single Individual",
    key: "singleIndividual/view",
    icon: <Icon fontSize="small">receipt_long</Icon>,
    route: "/Individual/view",
    component: <ViewSingleIndividual />,
  },
  // {
  //   name: "Workflow Lead",
  //   key: "leads/workflow",
  //   icon: <Icon fontSize="small">person_add_alt1</Icon>,
  //   route: "leads/workflow",
  //   component: <WorkflowLead />,
  // },
  {
    type: "collapse",
    name: "Leads Workflow",
    key: "leadsWorkflow",
    icon: <Icon fontSize="small">location_searching</Icon>,
    route: "Leads-Workflow",
    component: <LeadsWorkflow />,
  },
  {
    type: "collapse",
    name: "Client Level",
    key: "clientLevel",
    icon: <Icon fontSize="small">receipt_long</Icon>,
    route: "/client-Level",
    component: <CLientLevel />,
  },
  {
    type: "divider",
    name: "",
    key: "divd202",
    route: "",
  },
  {
    type: "title",
    title: "Demand And Supply",
    key: "titd202",
    route: "",
  },
  {
    type: "collapse",
    name: "Dashboard",
    key: "DemandSupplyStat",
    icon: <Icon fontSize="small">equalizer</Icon>,
    route: "/demand-&-Supply-Stat",
    component: <DemandSupply />,
  },
  {
    type: "collapse",
    name: "Products",
    key: "Products",
    icon: <Icon fontSize="small">meeting_room</Icon>,
    route: "/Products",
    component: <Products />,
  },
  {
    type: "collapse",
    name: "Services",
    key: "services",
    icon: <Icon fontSize="small">meeting_room</Icon>,
    route: "/services",
    component: <Services />,
  },
  {
    name: "Update Services",
    key: "services-branch",
    icon: <Icon fontSize="small">meeting_room</Icon>,
    route: "/services/branches",
    component: <SBranches />,
  },
  {
    name: "Service Branch",
    key: "update-services",
    icon: <Icon fontSize="small">meeting_room</Icon>,
    route: "/services/update",
    component: <UpdateService />,
  },
  {
    name: "Products Branch",
    key: "ProductsBranch",
    icon: <Icon fontSize="small">meeting_room</Icon>,
    route: "/products/products-Branch",
    component: <ProductsBranch />,
  },
  {
    name: "Update Products",
    key: "products/update",
    icon: <Icon fontSize="small">receipt_long</Icon>,
    route: "/product/update",
    component: <UpdateProducts />,
  },
  {
    name: "view Products",
    key: "products/update",
    icon: <Icon fontSize="small">receipt_long</Icon>,
    route: "/products/View-Products",
    component: <ViewProducts />,
  },
  {
    name: "Report Production",
    key: "products/reportProduction",
    icon: <Icon fontSize="small">receipt_long</Icon>,
    route: "product/Production-report",
    component: <ReportProduction />,
  },
  {
    name: "Update Report Production",
    key: "reportProduction/update",
    icon: <Icon fontSize="small">receipt_long</Icon>,
    route: "/Production-report/update",
    component: <UpdateReportProduction />,
  },
  {
    name: "Decline Production Report",
    key: "declineProductionReport",
    icon: <Icon fontSize="small">receipt_long</Icon>,
    route: "/products/Production-report/decline-Production-Report",
    component: <DeclineReportProduction />,
  },
  {
    name: "Generate Production Report",
    key: "declineProductionReport",
    icon: <Icon fontSize="small">receipt_long</Icon>,
    route: "/products/Production-report/generateProducton-Report",
    component: <GenerateProductionReport />,
  },
  {
    type: "collapse",
    name: "Demand",
    key: "demand",
    icon: <Icon fontSize="small">meeting_room</Icon>,
    route: "/demand",
    component: <Demand />,
  },
  {
    type: "collapse",
    name: "Supply",
    key: "supply",
    icon: <Icon fontSize="small">meeting_room</Icon>,
    route: "/supply",
    component: <Supply />,
  },
  {
    name: "Update Demand",
    key: "updateDemand",
    icon: <Icon fontSize="small">meeting_room</Icon>,
    route: "/demand/update-Demand",
    component: <DemandUpdate />,
  },
  {
    name: "View Demand",
    key: "viewDemand",
    icon: <Icon fontSize="small">meeting_room</Icon>,
    route: "/demand/view-Demand",
    component: <ViewDemand />,
  },
  {
    name: "Convert Demand To Supply",
    key: "ConvertDemandToSupply",
    icon: <Icon fontSize="small">meeting_room</Icon>,
    route: "/demand/convert-Demand-To-Supply",
    component: <ConvertDemandToSupply />,
  },
  {
    name: "Update Supply",
    key: "update supply",
    icon: <Icon fontSize="small">meeting_room</Icon>,
    route: "/supply/update-Supply",
    component: <SupplyUpdate />,
  },
  {
    name: "View Supply",
    key: "View supply",
    icon: <Icon fontSize="small">meeting_room</Icon>,
    route: "/supply/view-Supply",
    component: <ViewSupply />,
  },
  {
    type: "collapse",
    name: "Demand Statistics",
    key: "demand-statistics",
    icon: <Icon fontSize="small">equalizer</Icon>,
    route: "/demand-statistics",
    component: <DemandStat />,
  },
  {
    type: "collapse",
    name: "Supply Statistics",
    key: "Supplystat",
    icon: <Icon fontSize="small">equalizer</Icon>,
    route: "/supply-statistics",
    component: <Supplystat />,
  },
  {
    type: "divider",
    name: "",
    key: "divd979",
    route: "",
  },
  {
    type: "title",
    title: "Insurance",
    key: "titdins2",
    route: "",
  },
  {
    type: "collapse",
    name: "Insurance",
    key: "insurance",
    icon: <Icon fontSize="small">receipt_long</Icon>,
    route: "/insurance",
    component: <Insurance />,
  },
  {
    name: "Insurance Update",
    key: "updateInsurance",
    icon: <Icon fontSize="small">receipt_long</Icon>,
    route: "/insurance/update",
    component: <InsuranceUpdate />,
  },
  {
    name: "Insurance View",
    key: "viewInsurance",
    icon: <Icon fontSize="small">receipt_long</Icon>,
    route: "/insurance/view",
    component: <InsuranceView />,
  },
  {
    name: "Insurance Contribution",
    key: "insuranceContribution",
    icon: <Icon fontSize="small">receipt_long</Icon>,
    route: "/insurance/contribution",
    component: <InsuranceContribution />,
  },
  {
    name: "Insurance Damage",
    key: "insuranceDamage",
    icon: <Icon fontSize="small">receipt_long</Icon>,
    route: "/insurance/damage",
    component: <InsuranceDamage />,
  },
  {
    name: "Insurance Damage Update",
    key: "insuranceDamageUpdate",
    icon: <Icon fontSize="small">receipt_long</Icon>,
    route: "/insurance/damage/update",
    component: <UpdateInsuranceDamage />,
  },
  {
    type: "collapse",
    name: "Insurance Types",
    key: "insuranceType",
    icon: <Icon fontSize="small">receipt_long</Icon>,
    route: "/insurance/type",
    component: <InsuranceTypes />,
  },
  {
    type: "collapse",
    name: "Insurance Plans",
    key: "insurancePlan",
    icon: <Icon fontSize="small">book_online</Icon>,
    route: "/insurance/plan",
    component: <InsurancePlans />,
  },
  {
    name: "Attach Plan",
    key: "attachplan",
    icon: <Icon fontSize="small">receipt_long</Icon>,
    route: "/insurance/type/attach-plan",
    component: <AttachPlanCheckox />,
  },
  {
    type: "divider",
    name: "",
    key: "divd52",
    route: "",
  },
  {
    type: "title",
    title: "Leave Management",
    key: "titd52",
    route: "",
  },
  {
    type: "collapse",
    name: "Dashboard",
    key: "timeOffRequestdashboard",
    icon: <Icon fontSize="small">assignment</Icon>,
    route: "/time-off-Request-Dashboard",
    component: <TimeOffRequestsDashboard />,
  },
  {
    type: "collapse",
    name: "Time Off Requests",
    key: "timeOffRequest",
    icon: <Icon fontSize="small">assignment</Icon>,
    route: "/time-off-Requests",
    component: <TimeOffRequests />,
  },
  {
    name: "disapprove Time Off Requests",
    key: "timeOffRequest",
    icon: <Icon fontSize="small">assignment</Icon>,
    route: "/timeoff-Requests/disapprove",
    component: <Disapprove />,
  },
  // {
  //   name: "View",
  //   key: "view",
  //   icon: <Icon fontSize="small">meeting_room</Icon>,
  //   route: "/timeoffRequests/view",
  //   component: <View />,
  // },
  {
    // type: "collapse",
    name: "update Time Off Requests",
    key: "timeOffRequest",
    icon: <Icon fontSize="small">assignment</Icon>,
    route: "/time-off-Requests/update-time-off-Requests",
    component: <TimeoffRequestUpdate />,
  },
  {
    type: "collapse",
    name: "Free Days",
    key: "free-days",
    icon: <Icon fontSize="small">today</Icon>,
    route: "/free-days",
    component: <FreeDay />,
  },
  {
    type: "collapse",
    name: "Time-Off Type",
    key: "timeofftype",
    icon: <Icon fontSize="small">receipt_long</Icon>,
    route: "/Time-Off-Type",
    component: <TimeOffType />,
  },
  {
    name: "Add Time-Off Type To User",
    key: "userTimeOffType",
    icon: <Icon fontSize="small">supervised_user_circle</Icon>,
    route: "/user-Management/user-TimeOff-Type",
    component: <UserTOT />,
  },
  {
    type: "divider",
    name: "",
    key: "divd2657",
    route: "",
  },
  {
    type: "title",
    title: "Other Inflows",
    key: "titd212121",
    route: "",
  },
  {
    type: "collapse",
    name: "Other Inflow",
    key: "otherinflow",
    icon: <Icon fontSize="small">volunteer_activism</Icon>,
    route: "/other-inflow",
    component: <OtherInflow />,
  },
  {
    // type: "collapse",
    name: "Update Other Inflow",
    key: "otherinflowupdate",
    icon: <Icon fontSize="small">volunteer_activism</Icon>,
    route: "/other-inflow/update",
    component: <UpdateOtherInflow />,
  },
  {
    type: "collapse",
    name: "Filter Other Inflow",
    key: "filterotherinflow",
    icon: <Icon fontSize="small">volunteer_activism</Icon>,
    route: "/other-inflow/filter-other-inflow",
    component: <FilterOtherInflow />,
  },
  {
    type: "collapse",
    name: "Other Inflow Type",
    key: "otherinflowtype",
    icon: <Icon fontSize="small">volunteer_activism</Icon>,
    route: "/other-inflow-type",
    component: <OtherInflowType />,
  },
  {
    type: "divider",
    name: "",
    key: "divZzz123",
    route: "",
  },
  {
    type: "title",
    title: "Treasury Type",
    key: "zino112",
    route: "",
  },
  {
    type: "collapse",
    name: "Treasury Type",
    key: "treasuryType",
    icon: <Icon fontSize="small">volunteer_activism</Icon>,
    route: "/treasury-Type",
    component: <TreasuryType />,
  },
  {
    name: "Update Treasury Type",
    key: "updatetreasuryType",
    icon: <Icon fontSize="small">volunteer_activism</Icon>,
    route: "/treasury-Type/update",
    component: <UpdateTreasuryType />,
  },
  {
    type: "collapse",
    name: "Treasury",
    key: "treasury",
    icon: <Icon fontSize="small">volunteer_activism</Icon>,
    route: "/treasury",
    component: <Treasury />,
  },
  {
    name: "Treasury Contribution",
    key: "treasuryContribution",
    icon: <Icon fontSize="small">volunteer_activism</Icon>,
    route: "/treasury/treasury-Contribution",
    component: <TreasuryContribution />,
  },
  {
    name: "Update Treasury Contribution",
    key: "UpdatetreasuryContribution",
    icon: <Icon fontSize="small">volunteer_activism</Icon>,
    route: "/treasury/treasury-Contribution/update",
    component: <UpdateTreasuryContribution />,
  },
  {
    type: "collapse",
    name: "Treasury Debtors",
    key: "treasuryGetDebtors",
    icon: <Icon fontSize="small">volunteer_activism</Icon>,
    route: "/treasury/treasury-Get-Debtors",
    component: <TreasuryDebtors />,
  },
  {
    type: "divider",
    name: "",
    key: "divd1",
    route: "",
  },
  {
    type: "title",
    title: "Onboarding",
    key: "titd2",
    route: "",
  },
  {
    type: "collapse",
    name: "My Onboarding",
    key: "MyOnboarding",
    icon: <Icon fontSize="small">accessibility</Icon>,
    route: "/my-onboarding",
    component: <MyonBoarding />,
  },
  {
    type: "collapse",
    name: "Company Onboarding",
    key: "onboardingCompany",
    icon: <Icon fontSize="small">meeting_room</Icon>,
    route: "/company-onboarding",
    component: <OnboardingCompany />,
  },
  {
    type: "collapse",
    name: "Assigned Onboarding",
    key: "assignedOnboarding",
    icon: <Icon fontSize="small">meeting_room</Icon>,
    route: "/assigned-onboarding",
    component: <AssignedOnboarding />,
  },
  {
    name: "Onboarding Sessions",
    key: "onboardingSession",
    route: "/onboarding/sessions",
    component: <OnboardingSession />,
  },
  {
    name: "Onboarding Session",
    key: "onboardingMultiSession",
    route: "/onboarding/multi-sessions",
    component: <MultiSession />,
  },
  {
    name: "Update Onboarding Session",
    key: "updateOnboardingSession",
    route: "/onboarding/sessions/update",
    component: <UpdateOnboardingSession />,
  },
  {
    name: "Update Onboarding",
    key: "onboarding/update",
    icon: <Icon fontSize="small">receipt_long</Icon>,
    route: "/company-onboarding/update-Onboarding",
    component: <Updateonboarding />,
  },
  {
    name: "Update Offboarding",
    key: "offboarding/update",
    icon: <Icon fontSize="small">receipt_long</Icon>,
    route: "/company-offboarding/update-Offboarding",
    component: <Updateoffboarding />,
  },
  {
    name: "Onboarding Checklist",
    key: "onboardingChecklist",
    icon: <Icon fontSize="small">receipt_long</Icon>,
    route: "/onboardingChecklist",
    component: <OnboardingChecklist />,
  },
  {
    type: "divider",
    name: "",
    key: "divdq1",
    route: "",
  },
  {
    type: "title",
    title: "Offboarding",
    key: "titdq2",
    route: "",
  },
  {
    type: "collapse",
    name: "My Offboarding",
    key: "MyOffboarding",
    icon: <Icon fontSize="small">logout</Icon>,
    route: "/my-offboarding",
    component: <MyoffBoarding />,
  },
  {
    type: "collapse",
    name: "Company Offboarding",
    key: "offboardingCompany",
    icon: <Icon fontSize="small">meeting_room</Icon>,
    route: "/company-offboarding",
    component: <OffboardingCompany />,
  },
  {
    type: "collapse",
    name: "Assigned Offboarding",
    key: "assignedOffboarding",
    icon: <Icon fontSize="small">meeting_room</Icon>,
    route: "/assigned-offboarding",
    component: <AssignedOffboarding />,
  },
  {
    name: "Offboarding Sessions",
    key: "offboardingSession",
    route: "/offboarding/sessions",
    component: <OffboardingSession />,
  },
  {
    name: "Offboarding Session",
    key: "offboardingMultiSession",
    route: "/offboarding/multi-sessions",
    component: <MultiSessionOffboarding />,
  },
  {
    name: "Appointment Offboarding Sessions",
    key: "appointmentOffboardingSessions",
    route: "/offboarding-sessions/appointment",
    component: <AppointmentOffboardingSession />,
  },
  {
    name: "Update Offboarding Session",
    key: "updateOffboardingSession",
    route: "/offboarding/sessions/update",
    component: <UpdateOffboardingSession />,
  },
  {
    type: "divider",
    name: "",
    key: "divd84",
    route: "",
  },
  {
    type: "title",
    title: "Pension",
    key: "titd84",
    route: "",
  },
  {
    type: "collapse",
    name: "My Pension",
    key: "my-pension",
    icon: <Icon fontSize="small">receipt_long</Icon>,
    route: "/my-pension-history",
    component: <MyPension />,
  },
  {
    type: "collapse",
    name: "Pension Settings",
    key: "pension",
    icon: <Icon fontSize="small">receipt_long</Icon>,
    route: "/Pension",
    component: <Pension />,
  },
  {
    type: "collapse",
    name: "Company Pension",
    key: "company-pension",
    icon: <Icon fontSize="small">receipt_long</Icon>,
    route: "/company-pension",
    component: <CompanyPension />,
  },
  {
    name: "View User Pension",
    key: "view-user-pension",
    icon: <Icon fontSize="small">receipt_long</Icon>,
    route: "/view-user-pension",
    component: <ViewUserPension />,
  },
  {
    name: "Update User Pension",
    key: "update-user-pension",
    icon: <Icon fontSize="small">receipt_long</Icon>,
    route: "/update-user-pension",
    component: <UpdateUserPension />,
  },
  {
    name: "add Pension",
    key: "company-pension/add-pension",
    icon: <Icon fontSize="small">receipt_long</Icon>,
    route: "/company-pension/add-pension",
    component: <AddPension />,
  },
  {
    name: "Update Pension",
    key: "pension-providers/update",
    icon: <Icon fontSize="small">person_add_alt1</Icon>,
    route: "update-pension-provider",
    component: <UpdatePension />,
  },
  {
    name: "User Pension",
    key: "pension-providers/user",
    icon: <Icon fontSize="small">person_add_alt1</Icon>,
    route: "user-pension-settings",
    component: <UserPension />,
  },
  {
    type: "divider",
    name: "",
    key: "divd2",
    route: "",
  },
  {
    type: "title",
    title: "Project",
    key: "titd1",
    route: "",
  },
  {
    type: "collapse",
    name: "Project",
    key: "project",
    icon: <Icon fontSize="small">meeting_room</Icon>,
    route: "/project",
    component: <Project />,
  },
  {
    name: "Update Project",
    key: "updateProject",
    icon: <Icon fontSize="small">meeting_room</Icon>,
    route: "/project/update-Project",
    component: <ProjectUpdate />,
  },
  {
    name: "View Project",
    key: "viewProject",
    icon: <Icon fontSize="small">meeting_room</Icon>,
    route: "/project/view-Project",
    component: <ProjectView />,
  },
  {
    name: "Subtask ",
    key: "Subtask",
    icon: <Icon fontSize="small">meeting_room</Icon>,
    route: "/project/subtask",
    component: <Subtask />,
  },
  {
    name: "Update Subtask ",
    key: "Updatesub",
    icon: <Icon fontSize="small">meeting_room</Icon>,
    route: "/project/updatesubtask",
    component: <Updatesub />,
  },
  {
    type: "collapse",
    name: "Timesheet",
    key: "timeSheet",
    icon: <Icon fontSize="small">today</Icon>,
    route: "/timesheet",
    component: <TimeSheetManual />,
  },
  {
    name: "Update Timesheet",
    key: "timesheetUpdate",
    icon: <Icon fontSize="small">receipt_long</Icon>,
    route: "/timesheet/update-Timesheet",
    component: <UpdateTimesheet />,
  },
  {
    type: "divider",
    name: "",
    key: "divd304",
    route: "",
  },
  {
    type: "title",
    title: "Recruitment",
    key: "titd304",
    route: "",
  },
  {
    type: "collapse",
    name: "Pipeline",
    key: "pipeline",
    icon: <Icon fontSize="small">meeting_room</Icon>,
    route: "/pipeline",
    component: <Pipeline />,
  },
  {
    name: "Update User System Role",
    key: "userSystemRole",
    icon: <Icon fontSize="small">supervised_user_circle</Icon>,
    route: "/update-system-role",
    component: <UpdateSystemRole />,
  },
  {
    name: "User Salary",
    key: "userSalary",
    icon: <Icon fontSize="small">supervised_user_circle</Icon>,
    route: "/user-Management/user-Salary",
    component: <AddUserpayment />,
  },
  {
    name: "View Application",
    key: "viewApplication",
    icon: <Icon fontSize="small">meeting_room</Icon>,
    route: "/View-Application",
    component: <ViewApplication />,
  },
  {
    name: "Add Workflow To Jobpost",
    key: "addWorkflowToJobpost",
    icon: <Icon fontSize="small">meeting_room</Icon>,
    route: "/add-Workflow",
    component: <AddWorkflowToJobpost />,
  },
  {
    type: "collapse",
    name: "Job Post",
    key: "jobpost",
    icon: <Icon fontSize="small">work</Icon>,
    route: "/Job-Post",
    component: <JobPost />,
  },
  {
    name: "View / Update Job Post",
    key: "updatejobpost",
    icon: <Icon fontSize="small">meeting_room</Icon>,
    route: "/Job-Post/View-Or-Update-Job-Post",
    component: <UpdateJobPost />,
  },
  {
    name: "View Job Applications",
    key: "viewJobApplications",
    icon: <Icon fontSize="small">meeting_room</Icon>,
    route: "/Job-Post/View-Applications",
    component: <ViewJobApplications />,
  },
  {
    name: "View Particular Applications Job",
    key: "ViewParticularjob",
    icon: <Icon fontSize="small">meeting_room</Icon>,
    route: "/jobposts/GetJobPost/viewjobasHR",
    component: <ViewParticularjob />,
  },
  {
    type: "collapse",
    name: "CBT",
    key: "CBT",
    icon: <Icon fontSize="small">dvr</Icon>,
    route: "/CBT",
    component: <CBT />,
  },
  // {
  //   type: "collapse",
  //   name: "Take Cbt Question",
  //   key: "takecbtquestion",
  //   icon: <Icon fontSize="small">meeting_room</Icon>,
  //   route: "/cbt/assignCbtTestToJobPostApplicant/",
  //   component: <TakeCbtQuestion />,
  // },
  {
    name: "Add Question To CBT",
    key: "addquestion",
    icon: <Icon fontSize="small">meeting_room</Icon>,
    route: "/cbt/add-questions",
    component: <AddQuesToCBT />,
  },
  {
    name: "Question",
    key: "question",
    icon: <Icon fontSize="small">meeting_room</Icon>,
    route: "/cbt/question/",
    component: <Question />,
  },
  {
    name: "AssignCbtTestToJobPost",
    key: "assigncbttesttojobpost",
    icon: <Icon fontSize="small">meeting_room</Icon>,
    route: "/CBT/assign-CBT-To-JobPost/",
    component: <AssignCbtToJobPost />,
  },
  {
    name: "ViewCbtResult",
    key: "viewCbtResult",
    icon: <Icon fontSize="small">meeting_room</Icon>,
    route: "/cbt/view-Results/",
    component: <ViewResultsAdmin />,
  },
  {
    name: "Answer",
    key: "answer",
    icon: <Icon fontSize="small">meeting_room</Icon>,
    route: "/cbt/answer/",
    component: <CbtAnswer />,
  },
  {
    // type: "collapse",
    name: "Instruction",
    key: "instruction",
    icon: <Icon fontSize="small">meeting_room</Icon>,
    route: "/cbt/instruction/",
    component: <WelcomeCbt />,
  },
  {
    icon: <Icon fontSize="small">meeting_room</Icon>,
    key: "takecbt",
    route: "/cbt/takeCbt/",
    component: <TakeCBT />,
  },
  {
    type: "collapse",
    name: "Interview Schedule",
    key: "interviewSchedule",
    icon: <Icon fontSize="small">calendar_month</Icon>,
    route: "/interview-Schedule",
    component: <InterviewSchedule />,
  },
  {
    name: "View User Calendar",
    key: "view-calendar",
    icon: <Icon fontSize="small">key</Icon>,
    route: "/View-Calendar",
    component: <ViewCalendar />,
  },
  {
    name: "Update appointment",
    key: "update-appointment",
    icon: <Icon fontSize="small">today</Icon>,
    route: "/update-appointment",
    component: <UpdateCalendar />,
  },
  {
    name: "Scheduleed Interview",
    key: "scheduledInterview",
    icon: <Icon fontSize="small">calendar_month</Icon>,
    route: "/interview-Schedule/scheduled-Interview",
    component: <ScheduledInterview />,
  },
  {
    name: "Interview Date",
    key: "InterviewDate",
    icon: <Icon fontSize="small">calendar_month</Icon>,
    route: "/interview-Schedule/interview-Date",
    component: <InterviewDate />,
  },
  // {
  //   type: "collapse",
  //   name: "Chats",
  //   key: "chats",
  //   icon: <Icon fontSize="small">meeting_room</Icon>,
  //   route: "/matters-Arising/viewChats",
  //   component: <App />,
  // },
  {
    type: "collapse",
    name: "Test Question",
    key: "test-question",
    icon: <Icon fontSize="small">quiz</Icon>,
    route: "/test-question",
    component: <TestQuestion />,
  },
  {
    name: "Update Test Question",
    key: "updatetestquestions",
    icon: <Icon fontSize="small">meeting_room</Icon>,
    route: "/update",
    component: <Updatetest />,
  },
  {
    name: "Test Options",
    key: "testoptions",
    icon: <Icon fontSize="small">meeting_room</Icon>,
    route: "/options",
    component: <TestOptions />,
  },
  {
    name: "View Test Questions",
    key: "view",
    icon: <Icon fontSize="small">meeting_room</Icon>,
    route: "/test-Questions/view",
    component: <ViewTestQuestions />,
  },
  // {
  //   // type: "collapse",
  //   name: "Business Travel Dashboard",
  //   key: "businesstravelupdate",
  //   icon: <Icon fontSize="small">assignment</Icon>,
  //   route: "/businesstravel-Dashboard/exportpdf",
  //   component: <FunctionalComponent />,
  // },
  // {
  //   type: "collapse",
  //   name: "Html",
  //   key: "html",
  //   icon: <Icon fontSize="small">assignment</Icon>,
  //   route: "/businesstravel-Dashboard/exporthtml",
  //   component: <Html />,
  // },
  {
    name: "Answer",
    key: "answer",
    icon: <Icon fontSize="small">meeting_room</Icon>,
    route: "/testQuestions/answer/",
    component: <Answer />,
  },
  {
    type: "collapse",
    name: "Recruitment Grading",
    key: "recruitmentGrading",
    icon: <Icon fontSize="small">receipt_long</Icon>,
    route: "/Recruitment-Grading",
    component: <RecruitmentGrading />,
  },
  {
    name: "Update Recruitment Grading",
    key: "updaterecrutmentgrading",
    icon: <Icon fontSize="small">meeting_room</Icon>,
    route: "/recruitment-Grading/update-Recruitment-Grading",
    component: <RecruitmentUpdate />,
  },
  {
    type: "divider",
    name: "",
    key: "div438",
    route: "",
  },
  {
    type: "title",
    title: "Salary Management",
    key: "tit438",
    route: "",
  },
  {
    type: "collapse",
    name: "Salary Payment",
    key: "salaryPayment",
    icon: <Icon fontSize="small">payments</Icon>,
    route: "/Salary-Payment",
    component: <SalaryPayment />,
  },
  {
    type: "collapse",
    name: "Salary Prorate",
    key: "salaryProrate",
    icon: <Icon fontSize="small">remove_circle_outline</Icon>,
    route: "/salary-Prorate",
    component: <SalaryProrate />,
  },
  {
    name: "View User Prorate",
    key: "viewUserProrate",
    icon: <Icon fontSize="small">remove_circle_outline</Icon>,
    route: "/view-Salary-Prorate",
    component: <VuUserProrate />,
  },
  {
    type: "collapse",
    name: "Salary Time Settings",
    key: "salaryTime",
    icon: <Icon fontSize="small">timer</Icon>,
    route: "/salary-Time-Settings",
    component: <SalaryTime />,
  },
  {
    type: "collapse",
    name: "Bonus/Deduction",
    key: "bonusdeduction",
    icon: <Icon fontSize="small">remove_circle</Icon>,
    route: "/Bonus-And-Deduction",
    component: <Bonusdeduction />,
  },
  {
    name: "Clone Bonus/Deduction",
    key: "cloneBonusDeduction",
    icon: <Icon fontSize="small">remove_circle</Icon>,
    route: "/Bonus-And-Deduction/Clone",
    component: <CloneBonusDeduction />,
  },
  {
    name: "Update Bonus or Deduction",
    key: "updateBonusDeduction",
    icon: <Icon fontSize="small">remove_circle</Icon>,
    route: "/Bonus-And-Deduction/Update",
    component: <UpdateBonusOrDeduction />,
  },
  {
    type: "collapse",
    name: "Salary Advance",
    key: "salaryAdvance",
    icon: <Icon fontSize="small">arrow_upward</Icon>,
    route: "/Salary-Advance",
    component: <SalaryAdvance />,
  },
  {
    name: "Update Salary Advance",
    key: "updateSalaryAdvance",
    icon: <Icon fontSize="small">arrow_upward</Icon>,
    route: "/Salary-Advance/Update",
    component: <UpdateSalaryAdvance />,
  },
  {
    type: "divider",
    name: "",
    key: "divd980",
    route: "",
  },
  {
    type: "title",
    title: "Sales",
    key: "titdinssal2",
    route: "",
  },
  {
    type: "collapse",
    name: "Sales",
    key: "sales",
    icon: <Icon fontSize="small">point_of_sale</Icon>,
    route: "/sales",
    component: <Sales />,
  },
  {
    type: "collapse",
    name: "Credit Facility",
    key: "creditFacility",
    icon: <Icon fontSize="small">point_of_sale</Icon>,
    route: "/credit-Facility",
    component: <CreditFacility />,
  },
  {
    name: "Make Payment",
    key: "makepayment",
    icon: <Icon fontSize="small">point_of_sale</Icon>,
    route: "/credit-Facility/make-payment",
    component: <MakePayment />,
  },
  {
    name: "View Credit Facility",
    key: "creditFacility/view",
    icon: <Icon fontSize="small">point_of_sale</Icon>,
    route: "/credit-Facility/view",
    component: <ViewCreditFacility />,
  },
  {
    // type: "collapse",
    name: "Sales Payment",
    key: "salespayment",
    icon: <Icon fontSize="small">point_of_sale</Icon>,
    route: "/sales/sales-payment",
    component: <SalesPayment />,
  },
  {
    type: "collapse",
    name: "Filter Sales",
    key: "filtersales",
    icon: <Icon fontSize="small">point_of_sale</Icon>,
    route: "/sales/filter-Sales",
    component: <FilterSales />,
  },
  {
    type: "collapse",
    name: "Coupons",
    key: "coupons",
    icon: <Icon fontSize="small">point_of_sale</Icon>,
    route: "/coupons",
    component: <Coupons />,
  },
  {
    name: "UpdateCoupons",
    key: "updatecoupons",
    icon: <Icon fontSize="small">point_of_sale</Icon>,
    route: "/coupons/update",
    component: <UpdateCoupons />,
  },
  {
    type: "divider",
    name: "",
    key: "divd1Subscription",
    route: "",
  },
  {
    type: "title",
    title: "Subscription",
    key: "titd2BillSubscription",
    route: "",
  },
  {
    type: "collapse",
    name: "Subscription",
    key: "subscription",
    icon: <Icon fontSize="small">today</Icon>,
    route: "/subscription",
    component: <MySubscription />,
  },
  {
    type: "collapse",
    name: "General Subscription",
    key: "generalSubscription",
    icon: <Icon fontSize="small">today</Icon>,
    route: "/general-Subscription",
    component: <GeneralSubscription />,
  },
  {
    name: "Update Subscription",
    key: "updateMySubscription",
    icon: <Icon fontSize="small">today</Icon>,
    route: "/subscription/update-Subscription",
    component: <UpdateMySubscription />,
  },
  {
    type: "divider",
    name: "",
    key: "divd557",
    route: "",
  },
  {
    type: "title",
    title: "Tax",
    key: "titd5",
    route: "",
  },
  {
    type: "collapse",
    name: "Tax",
    key: "tax",
    icon: <Icon fontSize="small">toll</Icon>,
    route: "/Tax",
    component: <Tax />,
  },
  {
    type: "collapse",
    name: "Personal",
    key: "taxRemittancePersonal",
    icon: <Icon fontSize="small">hail</Icon>,
    route: "/tax-Remittance-Personal",
    component: <TaxRemittance />,
  },
  {
    type: "collapse",
    name: "organisation",
    key: "taxRemittanceOrganisation",
    icon: <Icon fontSize="small">corporate_fare</Icon>,
    route: "/tax-Remittance-Organisation",
    component: <TaxRemittanceOrg />,
  },
  // tuyryryry
  {
    type: "divider",
    name: "",
    key: "divd101",
    route: "",
  },
  {
    type: "title",
    title: "Tickets",
    key: "titd101",
    route: "",
  },
  {
    type: "collapse",
    name: "Dashboard",
    key: "ticketDashboard",
    icon: <Icon fontSize="small">book_online</Icon>,
    route: "/ticket-Dashboard",
    component: <TicketDashboard />,
  },
  {
    type: "collapse",
    name: "Tickets",
    key: "Tickets",
    icon: <Icon fontSize="small">confirmation_number</Icon>,
    route: "/Tickets",
    component: <Tickets />,
  },
  {
    name: "Tickets",
    key: "Tickets",
    icon: <Icon fontSize="small">confirmation_number</Icon>,
    route: "/Tickets/Chats",
    component: <TicketChatApp />,
  },
  {
    type: "collapse",
    name: "Ticket Settings",
    key: "ticketSettings",
    icon: <Icon fontSize="small">settings</Icon>,
    route: "/Ticket-Settings",
    component: <TicketSettings />,
  },
  {
    type: "collapse",
    name: "Ticket Client Settings",
    key: "ticketClientSettings",
    icon: <Icon fontSize="small">manage_accounts</Icon>,
    route: "/Ticket-Client-Settings",
    component: <TicketClientSettings />,
  },
  {
    type: "divider",
    name: "",
    key: "div490",
    route: "",
  },
  {
    type: "title",
    title: "Settings",
    key: "tit490",
    route: "",
  },
  {
    type: "collapse",
    name: "My Calendar Accessors",
    key: "calendar-accessors",
    icon: <Icon fontSize="small">key</Icon>,
    route: "/Calendar-Accessors",
    component: <Accessor />,
  },
  {
    type: "collapse",
    name: "Stage",
    key: "Stage",
    icon: <Icon fontSize="small">meeting_room</Icon>,
    route: "/stage",
    component: <Stage />,
  },
  {
    name: "Add Stage",
    key: " addStage",
    icon: <Icon fontSize="small">meeting_room</Icon>,
    route: "/workFlow/add-Stage",
    component: <AddStage />,
  },
  {
    name: "Stage Condition",
    key: "stage Conditions",
    icon: <Icon fontSize="small">receipt_long</Icon>,
    route: "/stage/Stage-Condition",
    component: <StageCondition />,
  },
  {
    type: "collapse",
    name: "General Workflow",
    key: "workflow",
    icon: <Icon fontSize="small">meeting_room</Icon>,
    route: "/workflow",
    component: <Workflow />,
  },
  {
    type: "collapse",
    name: "Groups",
    key: "groups",
    icon: <Icon fontSize="small">meeting_room</Icon>,
    route: "/Groups",
    component: <Groups />,
  },
  {
    name: "View Group",
    key: "viewgroup",
    icon: <Icon fontSize="small">receipt_long</Icon>,
    route: "/View-Group",
    component: <Groupview />,
  },
  {
    name: "Notifications",
    key: "notifications",
    icon: <Icon fontSize="small">meeting_room</Icon>,
    route: "/notifications",
    component: <GroupNotifications />,
  },
  {
    type: "collapse",
    name: "Branches",
    key: "branches",
    icon: <Icon fontSize="small">meeting_room</Icon>,
    route: "/branches",
    component: <Branches />,
  },
  {
    name: "Update Branches",
    key: "updateBranches",
    icon: <Icon fontSize="small">meeting_room</Icon>,
    route: "/Update-Branch",
    component: <UpdateBranch />,
  },
  {
    name: "Create Branch",
    key: "createBranch",
    icon: <Icon fontSize="small">meeting_room</Icon>,
    route: "/Create-Branch",
    component: <CreateBranch />,
  },
  {
    type: "collapse",
    name: "Departments",
    key: "departments",
    icon: <Icon fontSize="small">meeting_room</Icon>,
    route: "/departments",
    component: <Departments />,
  },
  {
    type: "collapse",
    name: "Positions",
    key: "position",
    icon: <Icon fontSize="small">receipt_long</Icon>,
    route: "/position",
    component: <Position />,
  },
  {
    type: "collapse",
    name: "Status Types",
    key: "statusType",
    icon: <Icon fontSize="small">receipt_long</Icon>,
    route: "/Status-Type",
    component: <Status />,
  },
  {
    type: "collapse",
    name: "Company Roles",
    key: "companyroles",
    icon: <Icon fontSize="small">receipt_long</Icon>,
    route: "/Company-Roles",
    component: <Roles />,
  },
  {
    type: "collapse",
    name: "Company Steps",
    key: "companysteps",
    icon: <Icon fontSize="small">receipt_long</Icon>,
    route: "/Company-Steps",
    component: <Steps />,
  },
  {
    name: "Add Roles And Permissions",
    key: "addRolesAndPerms",
    icon: <Icon fontSize="small">assignment</Icon>,
    route: "/System-Roles/Add-Permissions",
    component: <RolesAndPerms />,
  },
  {
    type: "collapse",
    name: "System Roles",
    key: "systemRoles",
    icon: <Icon fontSize="small">assignment</Icon>,
    route: "/system-Roles",
    component: <SysRoles />,
  },
  {
    name: "Checklists",
    key: "checklists",
    icon: <Icon fontSize="small">receipt_long</Icon>,
    route: "/Company-Roles/Add-Steps",
    component: <Checklists />,
  },
  {
    type: "divider",
    name: "",
    key: "divSet",
    route: "",
  },
  {
    type: "collapse",
    name: "Change Password",
    key: "ChangePassword",
    icon: <Icon fontSize="small">edit</Icon>,
    route: "/authentication/change-password",
    component: <ChangePassword />,
  },
  {
    type: "collapse",
    name: "User History",
    key: "userHistory",
    icon: <Icon fontSize="small">history</Icon>,
    route: "/user-History",
    component: <UserAudit />,
  },
  {
    name: "user login",
    key: "userlogin",
    icon: <Icon fontSize="small">edit</Icon>,
    route: "/authentication/userlogin",
    component: <Userlogin />,
  },
  {
    name: "User Profile",
    key: "userProfile",
    icon: <Icon fontSize="small">receipt_long</Icon>,
    route: "/user-Profile",
    component: <UserProfile />,
  },
  {
    name: "Company Profile",
    key: "companyProfile",
    icon: <Icon fontSize="small">receipt_long</Icon>,
    route: "/company-Profile",
    component: <CompanyProfile />,
  },
  {
    name: "User Info",
    key: "viewUser",
    icon: <Icon fontSize="small">receipt_long</Icon>,
    route: "/user-Management/view-User",
    component: <ViewUser />,
  },
  {
    name: "Company Regitration",
    key: "companyRegistration",
    icon: <Icon fontSize="small">assignment</Icon>,
    route: "/authentication/company-Registration",
    component: <CompanyReg />,
  },
  {
    name: "Sign In",
    key: "sign-in",
    icon: <Icon fontSize="small">login</Icon>,
    route: "/authentication/sign-in",
    component: <SignIn />,
  },
  {
    name: "Chat Rating",
    key: "chat-Rating",
    icon: <Icon fontSize="small">login</Icon>,
    route: "/authentication/chat-Rating",
    component: <ChatRating />,
  },
  {
    name: "Sign Up",
    key: "sign-up",
    icon: <Icon fontSize="small">assignment</Icon>,
    route: "/authentication/sign-up",
    component: <SignUp />,
  },
  {
    name: "Log In",
    key: "renewLogin",
    icon: <Icon fontSize="small">login</Icon>,
    route: "/authentication/renew-Login",
    component: <RenewLog />,
  },
  {
    name: "Renew Subscription",
    key: "renewSubscription",
    icon: <Icon fontSize="small">assignment</Icon>,
    route: "/authentication/renew-Subscription",
    component: <RenewSub />,
  },
  {
    name: "Invite User",
    key: "inviteUser",
    icon: <Icon fontSize="small">assignment</Icon>,
    route: "/authentication/inviteUser",
    component: <InviteUser />,
  },
  {
    name: "Time Off Requests Journey",
    key: "timeOffRequestjourney",
    icon: <Icon fontSize="small">assignment</Icon>,
    route: "/time-off-Requests/time-off-Request-Journey",
    component: <TimeOffRequestJourney />,
  },
  {
    name: "Time Off Requests Journey",
    key: "timeOffRequestjourney",
    icon: <Icon fontSize="small">assignment</Icon>,
    route: "/time-off-Requests/forward-Time-Off-Requests",
    component: <ForwardTimeOff />,
  },
  {
    name: "Reset Password",
    key: "forgot-password",
    icon: <Icon fontSize="small">assignment</Icon>,
    route: "/authentication/forgot-password",
    component: <ForgotPass />,
  },
  {
    name: "Add Details To Time Off Type",
    key: "adddetailtotimeofftype",
    icon: <Icon fontSize="small">assignment</Icon>,
    route: "/timeoff-type/add-Details-To-Time-Off-Type",
    component: <AddTimeOffType />,
  },
  {
    name: "Complete Reset Password",
    key: "complete-ResetPassword",
    icon: <Icon fontSize="small">assignment</Icon>,
    route: "authentication/complete-forgot-Password",
    component: <ComForgotPass />,
  },
  {
    name: "Payment",
    key: "paymentHistory",
    icon: <Icon fontSize="small">today</Icon>,
    route: "/payment",
    component: <PaymentHis />,
  },
  {
    name: "Forbidden",
    key: "forbiddenPage",
    icon: <Icon fontSize="small">assignment</Icon>,
    route: "/authentication/forbiddenPage",
    component: <ForbiddenPage />,
  },
];

export default routes;

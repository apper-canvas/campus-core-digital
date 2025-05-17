// AnalyticsService.js - Service for analytics data operations

const TABLE_NAME = 'analytics';

// Get ApperClient instance
const getApperClient = () => {
  const { ApperClient } = window.ApperSDK;
  return new ApperClient({
    apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
    apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
  });
};

// Get all analytics reports
export const fetchAnalytics = async (searchQuery = '') => {
  const client = getApperClient();
  
  // Build conditions based on search query
  const conditions = [];
  
  if (searchQuery) {
    conditions.push({
      fieldName: "title",
      operator: "Contains",
      values: [searchQuery]
    });
    
    conditions.push({
      fieldName: "description",
      operator: "Contains",
      values: [searchQuery]
    });
    
    conditions.push({
      fieldName: "type",
      operator: "Contains",
      values: [searchQuery]
    });
  }
  
  const params = {
    fields: ["Name", "title", "type", "description", "date"],
    where: conditions
  };
  
  const response = await client.fetchRecords(TABLE_NAME, params);
  return response.data;
};

// Create a new analytics report
export const createAnalytics = async (analyticsData) => {
  const client = getApperClient();
  
  const params = {
    records: [{
      Name: analyticsData.title,
      title: analyticsData.title,
      type: analyticsData.type,
      description: analyticsData.description,
      date: analyticsData.date
    }]
  };
  
  const response = await client.createRecord(TABLE_NAME, params);
  return response;
};
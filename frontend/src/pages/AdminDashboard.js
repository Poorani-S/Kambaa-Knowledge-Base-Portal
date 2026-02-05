import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  CheckCircle,
  XCircle,
  Clock,
  Eye,
  AlertCircle,
  Calendar,
  User,
  FileText,
  TrendingUp,
} from "lucide-react";
import Card from "../components/Card";
import Button from "../components/Button";
import api from "../utils/api";
import { toast } from "react-toastify";
import "./AdminDashboard.css";

const AdminDashboard = () => {
  const [pendingArticles, setPendingArticles] = useState([]);
  const [stats, setStats] = useState({
    pending: 0,
    approved: 0,
    rejected: 0,
    total: 0,
  });
  const [loading, setLoading] = useState(true);
  const [selectedArticle, setSelectedArticle] = useState(null);
  const [filter, setFilter] = useState("pending");
  const [processingId, setProcessingId] = useState(null);

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filter]);

  const fetchData = async () => {
    setLoading(true);
    try {
      const [articlesRes, statsRes] = await Promise.all([
        api.get(`/articles?status=${filter.toUpperCase()}`),
        api.get("/articles/stats"),
      ]);

      setPendingArticles(articlesRes.data || []);
      setStats(
        statsRes.data || { pending: 0, approved: 0, rejected: 0, total: 0 },
      );
      setLoading(false);
    } catch (error) {
      console.error("Error fetching data:", error);
      toast.error("Failed to load data");
      setLoading(false);
    }
  };

  const handleApprove = async (articleId) => {
    setProcessingId(articleId);
    try {
      await api.patch(`/articles/${articleId}/approve`);
      toast.success("Article approved successfully!");
      fetchData();
      setSelectedArticle(null);
    } catch (error) {
      console.error("Error approving article:", error);
      toast.error("Failed to approve article");
    } finally {
      setProcessingId(null);
    }
  };

  const handleReject = async (articleId) => {
    const reason = prompt("Enter rejection reason (optional):");
    setProcessingId(articleId);

    try {
      await api.patch(`/articles/${articleId}/reject`, { reason });
      toast.success("Article rejected");
      fetchData();
      setSelectedArticle(null);
    } catch (error) {
      console.error("Error rejecting article:", error);
      toast.error("Failed to reject article");
    } finally {
      setProcessingId(null);
    }
  };

  const getStatusIcon = (status) => {
    switch (status.toLowerCase()) {
      case "pending":
        return <Clock size={16} className="status-icon pending" />;
      case "approved":
        return <CheckCircle size={16} className="status-icon approved" />;
      case "rejected":
        return <XCircle size={16} className="status-icon rejected" />;
      default:
        return <AlertCircle size={16} className="status-icon" />;
    }
  };

  return (
    <div className="admin-dashboard">
      <div className="container">
        {/* Dashboard Header */}
        <motion.div
          className="dashboard-header"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div>
            <h1 className="dashboard-title">Admin Dashboard</h1>
            <p className="dashboard-subtitle">
              Review and manage submitted articles
            </p>
          </div>

          <div className="admin-badge">
            <AlertCircle size={18} />
            <span>Admin Access Only</span>
          </div>
        </motion.div>

        {/* Stats Cards */}
        <div className="stats-grid">
          {[
            {
              label: "Pending Review",
              value: stats.pending,
              icon: Clock,
              color: "yellow",
              active: filter === "pending",
            },
            {
              label: "Approved",
              value: stats.approved,
              icon: CheckCircle,
              color: "green",
              active: filter === "approved",
            },
            {
              label: "Rejected",
              value: stats.rejected,
              icon: XCircle,
              color: "red",
              active: filter === "rejected",
            },
            {
              label: "Total Articles",
              value: stats.total,
              icon: TrendingUp,
              color: "blue",
              active: filter === "all",
            },
          ].map((stat, index) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card
                  hover
                  className={`stat-card ${stat.active ? "active" : ""}`}
                  onClick={() =>
                    setFilter(
                      stat.label === "Total Articles"
                        ? "all"
                        : stat.label.split(" ")[0].toLowerCase(),
                    )
                  }
                >
                  <div className={`stat-icon-wrapper ${stat.color}`}>
                    <Icon size={24} />
                  </div>
                  <div className="stat-content">
                    <div className="stat-value">{stat.value}</div>
                    <div className="stat-label">{stat.label}</div>
                  </div>
                </Card>
              </motion.div>
            );
          })}
        </div>

        {/* Filter Tabs */}
        <motion.div
          className="filter-tabs"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          {["pending", "approved", "rejected", "all"].map((tab) => (
            <button
              key={tab}
              className={`filter-tab ${filter === tab ? "active" : ""}`}
              onClick={() => setFilter(tab)}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </motion.div>

        {/* Articles List */}
        {loading ? (
          <div className="articles-list">
            {[1, 2, 3].map((i) => (
              <div key={i} className="skeleton-card"></div>
            ))}
          </div>
        ) : pendingArticles.length === 0 ? (
          <Card className="empty-state">
            <div className="empty-content">
              <FileText size={64} className="empty-icon" />
              <h3>No {filter} articles</h3>
              <p>There are no articles in this category</p>
            </div>
          </Card>
        ) : (
          <div className="articles-list">
            {pendingArticles.map((article, index) => (
              <motion.div
                key={article.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05 }}
              >
                <Card hover>
                  <div className="article-item">
                    <div className="article-main">
                      <div className="article-status">
                        {getStatusIcon(article.status)}
                        <span
                          className={`status-text ${article.status.toLowerCase()}`}
                        >
                          {article.status}
                        </span>
                      </div>

                      <h3 className="article-item-title">{article.title}</h3>

                      <p className="article-item-excerpt">
                        {article.content?.substring(0, 150)}...
                      </p>

                      <div className="article-item-meta">
                        <div className="meta-item">
                          <User size={14} />
                          <span>{article.author}</span>
                        </div>
                        <div className="meta-item">
                          <Calendar size={14} />
                          <span>
                            {new Date(article.createdAt).toLocaleDateString()}
                          </span>
                        </div>
                        {article.category && (
                          <span className="category-badge">
                            {article.category}
                          </span>
                        )}
                      </div>
                    </div>

                    <div className="article-actions">
                      <Button
                        variant="outline"
                        size="sm"
                        icon={Eye}
                        onClick={() => setSelectedArticle(article)}
                      >
                        Preview
                      </Button>

                      {article.status === "PENDING" && (
                        <>
                          <Button
                            variant="success"
                            size="sm"
                            icon={CheckCircle}
                            onClick={() => handleApprove(article.id)}
                            loading={processingId === article.id}
                            disabled={processingId === article.id}
                          >
                            Approve
                          </Button>
                          <Button
                            variant="danger"
                            size="sm"
                            icon={XCircle}
                            onClick={() => handleReject(article.id)}
                            disabled={processingId === article.id}
                          >
                            Reject
                          </Button>
                        </>
                      )}
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        )}
      </div>

      {/* Article Preview Modal */}
      <AnimatePresence>
        {selectedArticle && (
          <motion.div
            className="modal-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedArticle(null)}
          >
            <motion.div
              className="modal-content"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            >
              <Card>
                <div className="modal-header">
                  <h2>{selectedArticle.title}</h2>
                  <button
                    className="modal-close"
                    onClick={() => setSelectedArticle(null)}
                  >
                    ×
                  </button>
                </div>

                <div className="modal-meta">
                  <div className="meta-item">
                    <User size={16} />
                    <span>{selectedArticle.author}</span>
                  </div>
                  <div className="meta-item">
                    <Calendar size={16} />
                    <span>
                      {new Date(selectedArticle.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                  {selectedArticle.category && (
                    <span className="category-badge">
                      {selectedArticle.category}
                    </span>
                  )}
                </div>

                <div className="modal-body">
                  <p>{selectedArticle.content}</p>
                </div>

                {selectedArticle.status === "PENDING" && (
                  <div className="modal-actions">
                    <Button
                      variant="success"
                      icon={CheckCircle}
                      onClick={() => handleApprove(selectedArticle.id)}
                      loading={processingId === selectedArticle.id}
                    >
                      Approve Article
                    </Button>
                    <Button
                      variant="danger"
                      icon={XCircle}
                      onClick={() => handleReject(selectedArticle.id)}
                      disabled={processingId === selectedArticle.id}
                    >
                      Reject Article
                    </Button>
                  </div>
                )}
              </Card>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default AdminDashboard;

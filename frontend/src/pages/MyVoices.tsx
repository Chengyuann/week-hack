import { useEffect, useState } from 'react';
import { Card, List, Button, Popconfirm, message, Empty } from 'antd';
import { DeleteOutlined, PlayCircleOutlined } from '@ant-design/icons';
import { listVoices, deleteVoice, type Voice } from '../api/voices';
import { useNavigate } from 'react-router-dom';
import { theme } from '../styles/theme';

const MyVoices = () => {
  const [voices, setVoices] = useState<Voice[]>([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const loadVoices = async () => {
    setLoading(true);
    try {
      const response = await listVoices();
      if (response.success) {
        // 这里应该过滤当前用户的voices，暂时显示所有
        setVoices(response.data.voices);
      }
    } catch (error) {
      console.error('加载角色列表失败:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadVoices();
  }, []);

  const handleDelete = async (voiceId: string) => {
    try {
      const response = await deleteVoice(voiceId);
      if (response.success) {
        message.success('删除成功');
        loadVoices();
      }
    } catch (error: any) {
      message.error(error.message || '删除失败');
    }
  };

  if (loading) {
    return (
      <div style={{ textAlign: 'center', padding: '120px 0' }}>
        <div style={{ 
          fontSize: '18px', 
          color: theme.colors.mutedText,
          fontFamily: theme.typography.body,
        }}>加载中...</div>
      </div>
    );
  }

  if (voices.length === 0) {
    return (
      <div style={{ textAlign: 'center', padding: '120px 0' }}>
        <Empty 
          description={
            <span style={{ 
              fontSize: '16px', 
              color: theme.colors.mutedText,
              fontFamily: theme.typography.body,
            }}>
              您还没有创建任何角色
            </span>
          } 
        />
      </div>
    );
  }

  return (
    <Card 
      bordered={false}
      style={{ 
        background: theme.colors.warmWhite,
        borderRadius: theme.borderRadius.large,
        boxShadow: theme.shadows.card,
      }}
      bodyStyle={{ padding: theme.spacing.xxl }}
      title={
        <h2 style={{ 
          margin: 0, 
          fontFamily: theme.typography.display,
          fontSize: '28px', 
          fontWeight: 600,
          color: theme.colors.charcoal,
          letterSpacing: '-0.5px',
        }}>
          我的角色
        </h2>
      }
    >
      <List
        dataSource={voices}
        renderItem={(voice) => (
          <List.Item
            style={{
              padding: theme.spacing.lg,
              marginBottom: theme.spacing.md,
              background: `linear-gradient(135deg, ${theme.colors.warmWhite} 0%, ${theme.colors.sage}10 100%)`,
              borderRadius: theme.borderRadius.medium,
              border: `1px solid ${theme.colors.sage}20`,
            }}
            actions={[
              <Button
                type="link"
                icon={<PlayCircleOutlined />}
                onClick={() => navigate(`/voices/${voice.id}`)}
                style={{ 
                  color: theme.colors.sage,
                  fontFamily: theme.typography.body,
                }}
              >
                查看
              </Button>,
              <Popconfirm
                title="确定要删除这个角色吗？"
                onConfirm={() => handleDelete(voice.id)}
                okText="确定"
                cancelText="取消"
              >
                <Button 
                  type="link" 
                  danger 
                  icon={<DeleteOutlined />}
                  style={{ fontFamily: theme.typography.body }}
                >
                  删除
                </Button>
              </Popconfirm>,
            ]}
          >
            <List.Item.Meta
              title={
                <span style={{ 
                  fontSize: '16px',
                  fontWeight: 600,
                  color: theme.colors.charcoal,
                  fontFamily: theme.typography.display,
                }}>
                  Voice {voice.id.slice(0, 8)}...
                </span>
              }
              description={
                <div style={{ 
                  color: theme.colors.mutedText,
                  fontFamily: theme.typography.body,
                  fontSize: '14px',
                }}>
                  <div>模型: {voice.model}</div>
                  <div>创建时间: {new Date(voice.createdAt).toLocaleString()}</div>
                </div>
              }
            />
          </List.Item>
        )}
      />
    </Card>
  );
};

export default MyVoices;




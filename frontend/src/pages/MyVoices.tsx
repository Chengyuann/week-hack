import { useEffect, useState } from 'react';
import { Card, List, Button, Popconfirm, message, Empty } from 'antd';
import { DeleteOutlined, PlayCircleOutlined } from '@ant-design/icons';
import { listVoices, deleteVoice, type Voice } from '../api/voices';
import { useNavigate } from 'react-router-dom';

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
    return <div>加载中...</div>;
  }

  if (voices.length === 0) {
    return <Empty description="您还没有创建任何角色" />;
  }

  return (
    <Card title="我的角色">
      <List
        dataSource={voices}
        renderItem={(voice) => (
          <List.Item
            actions={[
              <Button
                type="link"
                icon={<PlayCircleOutlined />}
                onClick={() => navigate(`/voices/${voice.id}`)}
              >
                查看
              </Button>,
              <Popconfirm
                title="确定要删除这个角色吗？"
                onConfirm={() => handleDelete(voice.id)}
                okText="确定"
                cancelText="取消"
              >
                <Button type="link" danger icon={<DeleteOutlined />}>
                  删除
                </Button>
              </Popconfirm>,
            ]}
          >
            <List.Item.Meta
              title={`Voice ${voice.id.slice(0, 8)}...`}
              description={
                <div>
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




import { useEffect, useState } from 'react';
import { Card, Input, Row, Col, Button, Spin, Empty, message } from 'antd';
import { SearchOutlined, PlayCircleOutlined } from '@ant-design/icons';
import { listVoices, type Voice } from '../api/voices';
import { useNavigate } from 'react-router-dom';

const { Search } = Input;

const Home = () => {
  const [voices, setVoices] = useState<Voice[]>([]);
  const [loading, setLoading] = useState(false);
  const [searchText, setSearchText] = useState('');
  const navigate = useNavigate();

  console.log('Home component rendered');

  const loadVoices = async () => {
    setLoading(true);
    try {
      console.log('Loading voices...');
      const response = await listVoices({ search: searchText || undefined });
      console.log('Voices response:', response);
      if (response && response.success) {
        setVoices(response.data.voices || []);
      } else {
        setVoices([]);
      }
    } catch (error: any) {
      console.error('加载角色列表失败:', error);
      // 不显示错误消息，避免干扰
      setVoices([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    console.log('Home useEffect triggered');
    loadVoices();
  }, []);

  const handleSearch = (value: string) => {
    setSearchText(value);
    loadVoices();
  };

  return (
    <div style={{ padding: '20px', minHeight: '400px' }}>
      <h1 style={{ marginBottom: '24px', fontSize: '24px', fontWeight: 'bold', color: '#333' }}>
        语音角色平台
      </h1>
      <div style={{ marginBottom: '24px' }}>
        <Search
          placeholder="搜索角色..."
          allowClear
          enterButton={<SearchOutlined />}
          size="large"
          onSearch={handleSearch}
          style={{ maxWidth: '600px' }}
        />
      </div>

      {loading ? (
        <div style={{ textAlign: 'center', padding: '50px' }}>
          <Spin size="large" />
          <div style={{ marginTop: '16px', color: '#666' }}>加载中...</div>
        </div>
      ) : voices.length === 0 ? (
        <Empty 
          description="暂无角色，点击上方'创建角色'开始创建" 
          image={Empty.PRESENTED_IMAGE_SIMPLE}
        />
      ) : (
        <Row gutter={[16, 16]}>
          {voices.map((voice) => (
            <Col xs={24} sm={12} md={8} lg={6} key={voice.id}>
              <Card
                hoverable
                actions={[
                  <Button
                    type="link"
                    icon={<PlayCircleOutlined />}
                    onClick={() => navigate(`/voices/${voice.id}`)}
                  >
                    查看详情
                  </Button>,
                ]}
              >
                <Card.Meta
                  title={`Voice ${voice.id.slice(0, 8)}...`}
                  description={
                    <div>
                      <div>模型: {voice.model}</div>
                      <div>创建时间: {new Date(voice.createdAt).toLocaleDateString()}</div>
                    </div>
                  }
                />
              </Card>
            </Col>
          ))}
        </Row>
      )}
    </div>
  );
};

export default Home;

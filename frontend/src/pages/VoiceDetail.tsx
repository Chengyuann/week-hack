import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Card, Descriptions, Button, Spin, message } from 'antd';
import { ArrowLeftOutlined, DownloadOutlined } from '@ant-design/icons';
import { getVoice, type Voice } from '../api/voices';

const VoiceDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [voice, setVoice] = useState<Voice | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id) {
      loadVoice();
    }
  }, [id]);

  const loadVoice = async () => {
    setLoading(true);
    try {
      const response = await getVoice(id!);
      if (response.success) {
        setVoice(response.data);
      }
    } catch (error: any) {
      message.error(error.message || '加载失败');
    } finally {
      setLoading(false);
    }
  };

  const handleDownload = () => {
    // 实现下载逻辑
    message.info('下载功能待实现');
  };

  if (loading) {
    return (
      <div style={{ textAlign: 'center', padding: '50px' }}>
        <Spin size="large" />
      </div>
    );
  }

  if (!voice) {
    return <div>角色不存在</div>;
  }

  return (
    <div>
      <Button
        icon={<ArrowLeftOutlined />}
        onClick={() => navigate(-1)}
        style={{ marginBottom: '16px' }}
      >
        返回
      </Button>

      <Card title="角色详情">
        <Descriptions column={2} bordered>
          <Descriptions.Item label="Voice ID">{voice.id}</Descriptions.Item>
          <Descriptions.Item label="Step Voice ID">{voice.stepVoiceId}</Descriptions.Item>
          <Descriptions.Item label="模型">{voice.model}</Descriptions.Item>
          <Descriptions.Item label="Embedding Hash">{voice.embeddingHash}</Descriptions.Item>
          <Descriptions.Item label="创建时间">
            {new Date(voice.createdAt).toLocaleString()}
          </Descriptions.Item>
          <Descriptions.Item label="更新时间">
            {new Date(voice.updatedAt).toLocaleString()}
          </Descriptions.Item>
          {voice.text && (
            <Descriptions.Item label="音频文本" span={2}>
              {voice.text}
            </Descriptions.Item>
          )}
        </Descriptions>

        {voice.sampleAudioPath && (
          <div style={{ marginTop: '24px' }}>
            <div style={{ marginBottom: '8px', fontWeight: 'bold' }}>试听音频</div>
            <audio controls style={{ width: '100%' }}>
              <source src={voice.sampleAudioPath} type="audio/wav" />
            </audio>
            <Button
              icon={<DownloadOutlined />}
              onClick={handleDownload}
              style={{ marginTop: '8px' }}
            >
              下载
            </Button>
          </div>
        )}
      </Card>
    </div>
  );
};

export default VoiceDetail;



